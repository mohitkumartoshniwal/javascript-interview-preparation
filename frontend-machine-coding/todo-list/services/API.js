import * as STORAGE from "./LocalStorageAPI.js";
// import * as STORAGE from "./IndexedDbAPI.js";

/**
 * @typedef Item
 * @type {object}
 * @property  {number} id
 * @property  {boolean} completed
 * @property  {string} text
 */

import { generateId } from "../utils.js";

export async function getItems() {
  return await STORAGE.getItems();
}

/**
 *
 * @param {Item[]} items
 */
export function saveItems(items) {
  STORAGE.saveItems(items);
}

/**
 *
 * @param {Item[]} items
 * @param {string} text
 */
export function addItem(items, text) {
  let newItem = {
    id: generateId(),
    text,
    completed: false,
  };

  items.push(newItem);
  saveItems(items);
  return newItem;
}

export function updateItem(items, updatedItem) {
  let oldItemIndex = items.findIndex((item) => item.id === updatedItem.id);
  let oldItem = items[oldItemIndex];

  items.splice(oldItemIndex, 1, {
    ...oldItem,
    completed: updatedItem.completed,
  });

  saveItems(items);
}

export function deleteItem(items, id) {
  let oldItemIndex = items.findIndex((item) => item.id === id);

  items.splice(oldItemIndex, 1);
  saveItems(items);
}
