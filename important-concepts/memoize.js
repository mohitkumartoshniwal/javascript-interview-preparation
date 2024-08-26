function memoize(fn, keyGen) {
  // If no custom key generator is provided, use a default function that joins arguments with an underscore
  if (!keyGen) {
    keyGen = (...args) => args.join("_");
  }

  // Initialize the cache using a Map to store computed results
  let cache = new Map();

  // Return a new function that wraps the original function
  return function (...args) {
    // Generate a unique key based on the provided arguments
    const key = keyGen(...args);

    // Check if the result is already cached
    if (cache.has(key)) {
      console.log("Cached");
      return cache.get(key); // Return the cached result
    } else {
      // Compute the result, cache it, and then return it
      const result = fn.call(this, ...args);
      cache.set(key, result);
      return result;
    }
  };
}

// Test Cases

// Simple memoization of a function that adds two numbers
const add = (a, b) => a + b;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(1, 2)); // Output: 3 (calculated)
console.log(memoizedAdd(1, 2)); // Output: 3 (cached)
console.log("\n");

console.log(memoizedAdd(2, 3)); // Output: 5 (calculated)
console.log(memoizedAdd(2, 3)); // Output: 5 (cached)
console.log("\n");

// Test memoization with a function that has a custom key generator
const multiply = (a, b) => a * b;
const memoizedMultiply = memoize(multiply, (a, b) => `${a}x${b}`);

console.log(memoizedMultiply(2, 3)); // Output: 6 (calculated)
console.log(memoizedMultiply(2, 3)); // Output: 6 (cached)
console.log("\n");

// Test with a function that depends on `this`
function User(name) {
  this.name = name;
}

User.prototype.getName = memoize(function () {
  return this.name;
});

const user = new User("Alice");
console.log(user.getName()); // Output: "Alice" (calculated)
console.log(user.getName()); // Output: "Alice" (cached)

// Output
// 3
// Cached
// 3

// 5
// Cached
// 5

// 6
// Cached
// 6

// Alice
// Cached
// Alice
