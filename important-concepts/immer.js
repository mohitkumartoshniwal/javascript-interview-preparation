/**
 * Creates a deep clone of the base object, applies modifications through the recipe function,
 * and returns the clone if modifications are detected; otherwise, returns the original base object.
 *
 * @param {Object} base - The original object to be cloned.
 * @param {Function} recipe - A function that takes the clone and applies modifications to it.
 * @returns {Object} - The modified clone if changes are made, or the original base object if no changes.
 */
function produce(base, recipe) {
  // Create a deep clone of the base object
  const clone = structuredClone(base);

  // Apply modifications to the clone using the recipe function
  recipe(clone);

  // Check if the base and clone are identical by serializing them to JSON strings
  if (JSON.stringify(base) === JSON.stringify(clone)) {
    return base; // Return the base object if no changes were made
  } else {
    // Validate and adjust modifications if changes were detected
    validateModifications(base, clone);
  }

  return clone; // Return the modified clone
}

/**
 * Validates and adjusts the clone object based on modifications compared to the base object.
 *
 * @param {Object} base - The original object used for comparison.
 * @param {Object} clone - The modified object to be validated.
 * @returns {Object} - The adjusted clone or base object if no modifications are detected.
 */
function validateModifications(base, clone) {
  // If either base or clone is not an object, return the value if they are equal
  if (typeof base !== "object" || typeof clone !== "object") {
    return base === clone ? base : clone;
  }

  // If either base or clone is null, return the value if they are equal
  if (base === null || clone === null) {
    return base === clone ? base : clone;
  }

  // Get the keys of the clone object
  const keys = Object.keys(clone);

  // Iterate over each key in the clone object
  for (const key of keys) {
    // Compare each key's value in base and clone
    if (JSON.stringify(base[key]) === JSON.stringify(clone[key])) {
      // If values are the same, revert clone value to base value
      clone[key] = base[key];
    } else {
      // Recursively validate and adjust nested objects
      validateModifications(base[key], clone[key]);
    }
  }
}

// 1. Basic Modification
const base1 = { a: 1, b: 2 };
const modified1 = produce(base1, (obj) => {
  obj.b = 3;
});
console.log(modified1); // Output: { a: 1, b: 3 }

// 2. No Modification
const base2 = { a: 1 };
const result2 = produce(base2, (obj) => {
  /* No modification */
});
console.log(result2); // Output: { a: 1 }

// 3. Nested Object Modification
const base3 = { a: 1, b: { c: 2, d: 3 } };
const modified3 = produce(base3, (obj) => {
  obj.b.c = 4;
});
console.log(modified3); // Output: { a: 1, b: { c: 4, d: 3 } }

// 4. Object with Array Modification
const base4 = { a: [1, 2, 3] };
const modified4 = produce(base4, (obj) => {
  obj.a.push(4);
});
console.log(modified4); // Output: { a: [1, 2, 3, 4] }
