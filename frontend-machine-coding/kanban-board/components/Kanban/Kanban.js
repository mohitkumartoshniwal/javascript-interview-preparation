import { getColumns, updateTaskPosition } from "../../services/API.js";
import {
  ACTIONS,
  ADD_COLUMN_EVENT,
  ADD_TASK_EVENT,
  TYPES,
} from "../../utils.js";
import { Column } from "../Column/Column.js";
import { Overlay } from "../Overlay/Overlay.js";

export class Kanban {
  constructor(config) {
    this.config = config;
    this.createKanbanBoard();
  }

  createKanbanBoard() {
    this.container = document.querySelector(this.config.container);
    if (!this.container) return;

    let frag = document.createDocumentFragment();

    getColumns().forEach((column) => {
      let columnEl = new Column(column.columnId, column.title).domElement;
      frag.appendChild(columnEl);
    });

    this.addColumnButton = document.createElement("button");
    this.addColumnButton.textContent = "+";
    this.addColumnButton.classList.add("add-column");
    this.addColumnButton.addEventListener("click", this.addColumn.bind(this));
    frag.appendChild(this.addColumnButton);

    this.container.appendChild(frag);

    this.overlayElement = new Overlay(this.container, this.addColumnButton);
    this.container.parentElement.appendChild(this.overlayElement.domElement);

    this.container.addEventListener("click", this.addTask.bind(this));

    this.container.addEventListener("dragstart", this.onDragStart.bind(this));
    this.container.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    this.container.addEventListener("dragend", this.onDragEnd.bind(this));
    this.container.addEventListener("drop", this.onDrop.bind(this));
  }

  addColumn(e) {
    this.overlayElement.domElement.dispatchEvent(
      new CustomEvent(ADD_COLUMN_EVENT, {
        detail: {
          action: ACTIONS.ADD_COLUMN,
        },
      })
    );
  }

  addTask(e) {
    let columnId = Number(e.target.dataset.columnId);
    let action = e.target.dataset.action;

    if (action !== ACTIONS.ADD_TASK) return;
    if (!columnId) return;

    this.overlayElement.domElement.dispatchEvent(
      new CustomEvent(ADD_TASK_EVENT, {
        detail: {
          action: ACTIONS.ADD_TASK,
          columnId,
        },
      })
    );
  }

  onDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.taskId);
    e.target.classList.add("is-dragging");
  }

  onDragEnd(e) {
    e.target.classList.remove("is-dragging");
  }

  onDrop(e) {
    e.preventDefault();
    if (!e.target.classList.contains("tasks")) return;

    let tasksContainer = e.target;
    let column = tasksContainer.closest(`[data-type='${TYPES.COLUMN}']`);
    let columnId = Number(column.dataset.columnId);
    let taskId = Number(e.dataTransfer.getData("text/plain"));

    let tasks = column.querySelectorAll(".task");
    let [closestBottomTask, closestIndex] = this.insertAboveTask(
      tasks,
      e.clientY
    );

    let task = this.container.querySelector(".is-dragging");

    if (!closestBottomTask) {
      tasksContainer.appendChild(task);
      updateTaskPosition(taskId, columnId, tasks.length);
    } else {
      tasksContainer.insertBefore(task, closestBottomTask);
      updateTaskPosition(taskId, columnId, closestIndex);
    }
  }

  insertAboveTask(tasks, mouseY) {
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    let closestIndex = null;

    tasks.forEach((task, index) => {
      const { top } = task.getBoundingClientRect();

      const offset = mouseY - top;

      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
        closestIndex = index;
      }
    });

    return [closestTask, closestIndex];
  }
}
