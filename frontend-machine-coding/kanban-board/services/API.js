import { generateId } from "../utils.js";
import * as STORAGE from "./LocalStorageAPI.js";

let columns = [];

export function getColumns() {
  columns = STORAGE.getColumns();
  return columns;
}

export function saveColumns(columns) {
  STORAGE.saveColumns(columns);
}

export function addColumn(title) {
  let newColumn = {
    columnId: generateId(),
    title,
    tasks: [],
  };
  columns.push(newColumn);
  saveColumns(columns);
  return newColumn;
}

export function deleteColumn(columnId) {
  columns = columns.filter((column) => column.columnId !== columnId);
  saveColumns(columns);
}

export function getTasks(columnId) {
  let columnData = columns.find((column) => column.columnId === columnId);

  if (!columnData) return [];

  return columnData.tasks;
}

export function addTask(columnId, content) {
  let newTask = {
    taskId: generateId(),
    content,
  };

  columns = columns.map((column) => {
    if (column.columnId === columnId) {
      return {
        ...column,
        tasks: [...column.tasks, newTask],
      };
    }
    return column;
  });

  saveColumns(columns);
  return newTask;
}

export function deleteTask(columnId, taskId) {
  columns = columns.map((column) => {
    if (column.columnId === columnId) {
      return {
        ...column,
        tasks: column.tasks.filter((task) => task.taskId !== taskId),
      };
    }
    return column;
  });

  saveColumns(columns);
}

export function updateTaskPosition(taskId, newColumnId, newPosition) {
  let currentTask;
  let existingColumn;
  // Find task and remove it from its current Location
  for (const column of columns) {
    let task = column.tasks.find((task) => task.taskId === taskId);

    if (task) {
      existingColumn = column;
      currentTask = task;

      columns = columns.map((column) => {
        if (column.columnId === existingColumn.columnId) {
          return {
            ...column,
            tasks: column.tasks.filter(
              (task) => task.taskId !== currentTask.taskId
            ),
          };
        }
        return column;
      });

      break;
    }
  }

  // Next we need to add it to new Location

  columns = columns.map((column) => {
    if (column.columnId === newColumnId && currentTask) {
      column.tasks.splice(newPosition, 0, currentTask);
      return {
        ...column,
        tasks: column.tasks,
      };
    }
    return column;
  });

  saveColumns(columns);
}
