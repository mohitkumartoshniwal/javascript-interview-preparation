import { get, set } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";
let KEY = "TODO-LIST";

export async function getItems() {
  let items = (await get(KEY)) ?? [];
  return items;
}

export function saveItems(items) {
  set(KEY, items);
}
