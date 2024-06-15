import { getElementFromHtml } from "../../utils.js";

export class Item {
  constructor(item) {
    this.domElement = this.getElement(item);
    this.checkbox = this.domElement.querySelector('[type="checkbox"]');
    this.checkbox.checked = item.completed ? true : false;
  }

  getElement(item) {
    return getElementFromHtml(`
    <div data-id="${item.id}" class="item">
        <input type="checkbox" class="item__checkbox" data-id="${item.id}">
        <div class="item__text">${item.text}</div>
        <button class="item__delete" data-id="${item.id}">✖</button>
  </div>
    `);
  }
}
