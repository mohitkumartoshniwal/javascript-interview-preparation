import { Stack } from "./stack.js";

const stack = new Stack();
stack.push(2);
stack.push(3);
console.log(`Elements in Stack: ${stack.items}`);
console.log(`Popped element from Stack: ${stack.pop()}`);
console.log(`Is Stack Empty?: ${stack.isEmpty()}`);
console.log(`Top element in Stack: ${stack.peek()}`);
console.log(`Size of Stack: ${stack.size()}`);
stack.clear();
console.log(`Size of Stack: ${stack.size()}`);

/*
Output:

Elements in Stack: 2,3
Popped element from Stack: 3
Is Stack Empty?: false
Top element in Stack: 2
Size of Stack: 1
Size of Stack: 0
*/
