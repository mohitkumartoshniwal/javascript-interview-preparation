import { AddItem } from "../AddItem/AddItem.js";
import { ItemsContainer } from "../ItemsContainer/ItemsContainer.js";

let defaultConfig = {
  container: ".todo-list",
};

export class Todo {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });
    this.createTodo();
  }

  createTodo() {
    this.container = document.querySelector(this.config.container);

    if (!this.container) return;

    this.addItemEl = new AddItem(this.addNewItem.bind(this));
    this.container.appendChild(this.addItemEl.domElement);

    this.itemsContainer = new ItemsContainer();
    this.container.appendChild(this.itemsContainer.domElement);
  }

  addNewItem(value) {
    this.itemsContainer.addNewItem(value);
  }
}
