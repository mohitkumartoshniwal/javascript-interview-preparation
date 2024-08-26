function classNames(...args) {
  const result = []; // Initialize an empty array to store class names

  // Iterate over each argument
  args.forEach((arg) => {
    // Skip falsy values (null, undefined, false, 0, etc.)
    if (!arg) {
      return;
    }

    // If the argument is a string or number, add it directly to the result
    if (typeof arg === "string" || typeof arg === "number") {
      result.push(arg);
      return;
    }

    // If the argument is an array, process each item
    if (Array.isArray(arg)) {
      for (const val of arg) {
        if (val) {
          // Recursively call classNames for nested arrays
          result.push(classNames(val));
        }
      }
      return;
    }

    // If the argument is an object, process each key-value pair
    for (const key in arg) {
      const value = arg[key];

      // If the value is truthy, add the key to the result
      if (value) {
        result.push(classNames(key));
      }
    }
  });

  // Join the array into a single string separated by spaces
  return result.join(" ");
}

// Test with strings and numbers
console.log(classNames("btn", "btn-primary", 123));
// Output: "btn btn-primary 123"

// Test with falsy values and nested arrays
console.log(classNames("btn", null, "btn-primary", ["active", ["large"]]));
// Output: "btn btn-primary active large"

// Test with objects
console.log(classNames("btn", { "btn-primary": true, "btn-secondary": false }));
// Output: "btn btn-primary"

// Test with nested arrays and objects
console.log(
  classNames([
    "btn",
    { "btn-primary": true, "btn-secondary": false },
    ["large", { "text-center": true }],
  ])
);
// Output: "btn btn-primary large text-center"

// Test with empty and mixed values
console.log(
  classNames(null, undefined, "", false, 0, "class1", [
    "class2",
    { class3: true },
  ])
);
// Output: "class1 class2 class3"
