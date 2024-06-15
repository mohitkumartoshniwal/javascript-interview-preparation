import { getElementFromHtml } from "../../utils.js";

export class AddItem {
  constructor(onAddItemCallback) {
    this.domElement = this.getElement();
    this.domElement.querySelector("button").addEventListener("click", (e) => {
      let inputEl = e.target.previousElementSibling;
      let value = inputEl.value;
      if (value) {
        onAddItemCallback(value);
        inputEl.value = "";
      } else {
        alert("Please enter task");
      }
    });
  }

  getElement() {
    return getElementFromHtml(`
    <div class="add-item">
        <input type="text" class="add-item__input" placeholder="Enter Todo here">
        <button class="add-item__button">ADD</button>
    </div>
    `);
  }
}
