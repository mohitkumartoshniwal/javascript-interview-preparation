function memoizeLast(fn, isArgsEqual) {
  // If no custom equality function is provided, use a default one
  if (!isArgsEqual) {
    isArgsEqual = (args1, args2) => {
      // Check if the argument arrays have different lengths
      if (args1.length !== args2.length) {
        return false;
      } else {
        // Compare each argument in the arrays
        for (let index = 0; index < args1.length; index++) {
          const value1 = args1[index];
          const value2 = args2[index];

          // If any argument differs, return false
          if (value1 !== value2) {
            return false;
          }
        }
      }

      // If all arguments match, return true
      return true;
    };
  }

  let lastArgs = []; // Stores the arguments from the last function call
  let lastResult; // Stores the result of the last function call

  return function (...args) {
    // If the current arguments match the previous ones, return the cached result
    if (isArgsEqual(args, lastArgs)) {
      console.log("Cached result used");
      return lastResult;
    } else {
      // Otherwise, compute the result, cache it, and update the lastArgs
      const result = fn.call(this, ...args);
      lastArgs = args;
      lastResult = result;
      return result;
    }
  };
}

// Test Cases

// Simple memoization of a function that adds two numbers
const add = (a, b) => a + b;
const memoizedAdd = memoizeLast(add);

console.log(memoizedAdd(1, 2)); // Output: 3 (calculated)
console.log(memoizedAdd(1, 2)); // Output: 3 (cached)
console.log("\n");

console.log(memoizedAdd(2, 3)); // Output: 5 (calculated)
console.log(memoizedAdd(2, 3)); // Output: 5 (cached)
console.log("\n");

console.log(memoizedAdd(1, 2)); // Output: 3 (cached again)
console.log("\n");

// Test memoization with a function that multiplies numbers
const multiply = (a, b) => a * b;
const memoizedMultiply = memoizeLast(multiply);

console.log(memoizedMultiply(3, 4)); // Output: 12 (calculated)
console.log(memoizedMultiply(3, 4)); // Output: 12 (cached)
console.log("\n");

console.log(memoizedMultiply(2, 5)); // Output: 10 (calculated)
console.log(memoizedMultiply(2, 5)); // Output: 10 (cached)
console.log("\n");

// Test with a custom equality checker (ignoring the order of arguments)
const customComparator = (args1, args2) => {
  // Sort the arguments before comparing
  return args1.sort().toString() === args2.sort().toString();
};
const memoizedSumUnordered = memoizeLast(add, customComparator);

console.log(memoizedSumUnordered(2, 1)); // Output: 3 (calculated)
console.log(memoizedSumUnordered(1, 2)); // Output: 3 (cached, even though the order changed)

// Output
// 3
// Cached result used
// 3

// 5
// Cached result used
// 5

// 3

// 12
// Cached result used
// 12

// 10
// Cached result used
// 10

// 3
// Cached result used
// 3
