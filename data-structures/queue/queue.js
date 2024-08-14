export class Queue {
  constructor() {
    this.items = [];
  }

  // Add new element in queue
  enqueue(item) {
    this.items.push(item);
  }

  // Remove element from queue
  dequeue() {
    return this.items.shift();
  }

  // Return first element from queue
  front() {
    return this.items[0];
  }

  // Return last element from queue
  rear() {
    return this.items[this.items.length - 1];
  }

  //   Check if Queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  //   Return size of Queue
  size() {
    return this.items.length;
  }
}
