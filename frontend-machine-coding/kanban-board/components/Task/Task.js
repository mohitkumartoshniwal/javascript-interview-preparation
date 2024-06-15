import { ACTIONS, TYPES, getElementFromHtml } from "../../utils.js";

export class Task {
  constructor(columnId, taskId, content) {
    this.domElement = this.getElement(columnId, taskId, content);
  }

  getElement(columnId, taskId, content) {
    return getElementFromHtml(`
          <li class="task" draggable="true" data-type="${TYPES.TASK}" data-column-id="${columnId}" data-task-id="${taskId}">
              <p class="task-input">${content}</p>
              <button class="delete-task" data-action="${ACTIONS.DELETE_TASK}" data-column-id="${columnId}" data-task-id="${taskId}">&#10006;</button>
            </li>
          `);
  }
}
