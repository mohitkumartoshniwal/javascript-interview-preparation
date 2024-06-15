import { deleteColumn, deleteTask, getTasks } from "../../services/API.js";
import { ACTIONS, TYPES, getElementFromHtml } from "../../utils.js";
import { Task } from "../Task/Task.js";

export class Column {
  constructor(columnId, title) {
    this.domElement = this.getElement(columnId, title);
    this.tasksContainer = this.domElement.querySelector(".tasks");
    this.init(columnId);
  }

  init(columnId) {
    this.setupListeners();
    this.renderTasks(columnId);
  }

  getElement(columnId, title) {
    return getElementFromHtml(`
        <div class="column" data-type="${TYPES.COLUMN}" data-column-id="${columnId}">
          <div class="column-header">
            <h2 class="title">${title}</h2>
            <button class="delete-column" data-action="${ACTIONS.DELETE_COLUMN}"  data-column-id="${columnId}" >&#10006;</button>
            </div>
          <ul class="tasks"></ul>
          <button class="add-task" data-action="${ACTIONS.ADD_TASK}" data-column-id="${columnId}">Add</button>
        </div>`);
  }

  setupListeners(e) {
    this.domElement.addEventListener("click", (e) => {
      let columnId = Number(e.target.dataset.columnId);
      let action = e.target.dataset.action;

      if (!columnId) return;
      if (!action) return;

      if (action === ACTIONS.DELETE_TASK) {
        let taskId = Number(e.target.dataset.taskId);

        if (!taskId) return;

        let task = e.target.previousElementSibling.textContent;
        let result = confirm(`Are you sure you want to delete ${task}?`);
        if (result) {
          deleteTask(columnId, taskId);
          e.target.parentElement.remove();
        }
      } else if (action === ACTIONS.DELETE_COLUMN) {
        let column = e.target.previousElementSibling.textContent;

        let result = confirm(`Are you sure you want to delete ${column}?`);
        if (result) {
          deleteColumn(columnId);
          e.target.parentElement.parentElement.remove();
        }
      }
    });
  }
  renderTasks(columnId) {
    let frag = document.createDocumentFragment();
    getTasks(columnId).forEach((task) => {
      let taskEl = new Task(columnId, task.taskId, task.content).domElement;
      frag.appendChild(taskEl);
    });
    this.tasksContainer.appendChild(frag);
  }
}
