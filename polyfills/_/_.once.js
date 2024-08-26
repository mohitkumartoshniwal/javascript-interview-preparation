/**
 * Creates a function that can be called only once. Subsequent calls return the result of the first call.
 *
 * @param {Function} fn - The function to be called only once.
 * @returns {Function} A new function that wraps the original function `fn`.
 */
function once(fn) {
  // Flag to track if the function has already been called
  let isCalledOnce = false;

  // Variable to store the result of the function call
  let result;

  return function (...args) {
    // Check if the function has not been called yet
    if (!isCalledOnce) {
      // Call the function with the provided arguments and context
      result = fn.call(this, ...args);

      // Set the flag to true to prevent further calls
      isCalledOnce = true;
    }

    // Return the result of the first call
    return result;
  };
}

function sayHello(name) {
  return `Hello, ${name}!`;
}
const sayHelloOnce = once(sayHello);

console.log(sayHelloOnce("Alice")); // Output: "Hello, Alice!" (first call)
console.log(sayHelloOnce("Bob")); // Output: "Hello, Alice!" (subsequent calls)
