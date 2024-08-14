export class Stack {
  constructor() {
    this.items = [];
  }

  //   Push an item in the Stack
  push(item) {
    this.items.push(item);
  }

  //   Pop an item from the Stack
  pop() {
    return this.items.pop();
  }

  //   Peek top item from the Stack
  peek() {
    return this.items[this.items.length - 1];
  }

  //   is Stack Empty?
  isEmpty() {
    return this.items.length === 0;
  }

  //   Clear the Stack
  clear() {
    this.items.length = 0;
  }

  //   Size of the Stack
  size() {
    return this.items.length;
  }
}
