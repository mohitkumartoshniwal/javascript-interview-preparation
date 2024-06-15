import { addColumn, addTask } from "../../services/API.js";
import {
  ACTIONS,
  ADD_COLUMN_EVENT,
  ADD_TASK_EVENT,
  getElementFromHtml,
} from "../../utils.js";
import { Column } from "../Column/Column.js";
import { Task } from "../Task/Task.js";

export class Overlay {
  constructor(container, addColumnButton) {
    this.domElement = this.getElement();
    this.inputElement = this.domElement.querySelector("input");
    this.addButton = this.domElement.querySelector("button");
    this.container = container;
    this.addColumnButton = addColumnButton;
    this.action = "";
    this.columnId = "";
    this.setupListeners();
  }

  getElement() {
    return getElementFromHtml(`
        <div class="add-task-column-container">
          <input type="text" class="entity-input" placeholder="Enter task or column...." />
          <button class="add-task-column">+</button>
        </div>
          `);
  }

  setupListeners() {
    this.domElement.addEventListener(ADD_COLUMN_EVENT, (e) => {
      let { action } = e.detail;
      this.action = action;
      this.toggleOverlay();
    });

    this.domElement.addEventListener(ADD_TASK_EVENT, (e) => {
      let { action, columnId } = e.detail;
      this.action = action;
      this.columnId = columnId;
      this.toggleOverlay();
    });

    this.addButton.addEventListener("click", (e) => {
      if (this.action === ACTIONS.ADD_COLUMN) {
        this.addColumn(e);
      } else if (this.action === ACTIONS.ADD_TASK) {
        this.addTask(e);
      }
    });
  }

  addTask(e) {
    let value = this.inputElement.value.trim();
    let task = addTask(this.columnId, value);

    let taskEl = new Task(this.columnId, task.taskId, task.content).domElement;

    let selectedColumn = this.container.querySelector(
      `[data-column-id="${this.columnId}"]`
    );

    selectedColumn.querySelector(".tasks").appendChild(taskEl);
    this.inputElement.value = "";
    this.toggleOverlay();
  }

  addColumn(e) {
    let value = this.inputElement.value.trim();

    let newColumn = addColumn(value);
    let newColumnEl = new Column(newColumn.columnId, newColumn.title)
      .domElement;
    this.container.insertBefore(newColumnEl, this.addColumnButton);

    this.inputElement.value = "";
    this.toggleOverlay();
  }

  toggleOverlay() {
    this.domElement.classList.toggle("flex");
  }
}
