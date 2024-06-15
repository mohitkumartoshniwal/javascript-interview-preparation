let KEY = "KANBAN-BOARD";

/**
 * @typedef Task
 * @type {object}
 * @property {number} taskId
 * @property {string} content
 */

/**
 * @typedef Column
 * @type {object}
 * @property {number} columnId
 * @property {string} title
 * @property {Task[]} tasks
 */

/**
 *
 * @returns {Column[]}
 */
export function getColumns() {
  let columns = localStorage.getItem(KEY) ?? "[]";
  return JSON.parse(columns);
}

/**
 *
 * @param {Column[]} columns
 */
export function saveColumns(columns) {
  localStorage.setItem(KEY, JSON.stringify(columns));
}
