Function.prototype.myBind = function (context = {}, ...args) {
  // `fn` is the function that `myBind` is being invoked on
  const fn = this;

  // Check if `fn` is actually a function
  if (typeof fn !== "function") {
    throw new Error("It's not callable");
  }

  // Create a unique symbol to avoid property name collisions
  const key = Symbol();

  // Temporarily assign `fn` as a property of `context`
  context[key] = fn;

  // Return a new function that, when called, will invoke `fn` with the given `context` and arguments
  return function (...newArgs) {
    return context[key](...args, ...newArgs);
  };
};

// Test Case 1: Basic Usage
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}
const boundGreet = greet.myBind({}, "Hello");
console.log(boundGreet("Alice")); // Output: "Hello, Alice!"

// Test Case 2: With a Custom Context Object
const context = { name: "Bob" };
function introduce(role) {
  return `${this.name} is a ${role}.`;
}
const boundIntroduce = introduce.myBind(context);
console.log(boundIntroduce("developer")); // Output: "Bob is a developer."

// Test Case 3: Handling Non-Function Context
try {
  const nonFunction = {};
  nonFunction.myBind = Function.prototype.myBind;
  nonFunction.myBind(); // This should throw an error
} catch (error) {
  console.error(error.message); // Output: "It's not callable"
}

// Test Case 4: Pre-set Arguments
function multiply(a, b) {
  return a * b;
}
const boundMultiply = multiply.myBind({}, 2);
console.log(boundMultiply(3)); // Output: 6

// Test Case 5: Multiple Pre-set and New Arguments
function add(a, b, c) {
  return a + b + c;
}
const boundAdd = add.myBind({}, 1, 2);
console.log(boundAdd(3)); // Output: 6

// Test Case 6: Empty `args`
function greetEveryone() {
  return "Hello, everyone!";
}
const boundGreetEveryone = greetEveryone.myBind({});
console.log(boundGreetEveryone()); // Output: "Hello, everyone!"
