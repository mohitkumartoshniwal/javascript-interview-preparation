Function.prototype.myApply = function (context = {}, args) {
  // `fn` is the function that `myApply` is being invoked on
  const fn = this;

  // Check if `fn` is actually a function
  if (typeof fn !== "function") {
    throw new Error("It's not callable");
  }

  // Ensure `args` is an array
  if (!Array.isArray(args)) {
    throw new TypeError("Second argument must be an array");
  }

  // Create a unique symbol to avoid property name collisions
  const key = Symbol();

  // Temporarily assign `fn` as a property of `context`
  context[key] = fn;

  // Call the function with the provided `context` and arguments
  const result = context[key](...args);

  // Remove the temporary property from `context`
  delete context[key];

  // Return the result of the function call
  return result;
};

// Test Case 1: Basic Usage
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}
const context1 = {};
console.log(greet.myApply(context1, ["Hello", "Alice"])); // Output: "Hello, Alice!"

// Test Case 2: With a Custom Context Object
const context2 = { name: "Bob" };
function introduce(role) {
  return `${this.name} is a ${role}.`;
}
console.log(introduce.myApply(context2, ["developer"])); // Output: "Bob is a developer."

// Test Case 3: Handling Non-Function Context
try {
  const nonFunction = {};
  nonFunction.myApply = Function.prototype.myApply;
  nonFunction.myApply([], []); // This should throw an error
} catch (error) {
  console.error(error.message); // Output: "It's not callable"
}

// Test Case 4: `args` Not an Array
try {
  function sayGoodbye(name) {
    return `Goodbye, ${name}!`;
  }
  sayGoodbye.myApply(null, "Charlie"); // This should throw a TypeError
} catch (error) {
  console.error(error.message); // Output: "Second argument must be an array"
}
