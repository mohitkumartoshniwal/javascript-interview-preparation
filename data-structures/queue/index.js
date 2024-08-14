import { Queue } from "./queue.js";

const queue = new Queue();
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(7);
console.log(`Elements in Queue: ${queue.items}`);
console.log(`Removed element from Queue: ${queue.dequeue()}`);
console.log(`Is Queue Empty?: ${queue.isEmpty()}`);
console.log(`Front element in queue: ${queue.front()}`);
console.log(`Rear element in queue: ${queue.rear()}`);
console.log(`Size of Queue: ${queue.size()}`);

/*
Output:

Elements in Queue: 2,3,7
Removed element from Queue: 2
Is Queue Empty?: false
Front element in queue: 3
Rear element in queue: 7
Size of Queue: 2
*/
