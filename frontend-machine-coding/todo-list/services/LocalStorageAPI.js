let KEY = "TODO-LIST";

export function getItems() {
  let items = localStorage.getItem(KEY) ?? "[]";
  return JSON.parse(items);
}

export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
