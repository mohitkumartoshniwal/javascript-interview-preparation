function isEqual(a, b) {
  // Special case to handle NaN, as NaN !== NaN in JavaScript.
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // If both values are strictly equal, return true (handles primitive types).
  if (a === b) {
    return true;
  }

  // If either value is not an object (or if they are different types), return false.
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // Get the keys of both objects for comparison.
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // If the objects have different numbers of keys, they are not equal.
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Iterate over each key in the first object.
  for (let index = 0; index < keysA.length; index++) {
    const keyA = keysA[index];
    const keyB = keysB[index];

    // Recursively check if the keys and corresponding values are equal.
    if (!isEqual(a[keyA], b[keyB])) {
      return false;
    }
  }

  // If all checks pass, the objects are equal.
  return true;
}

console.log(isEqual(1, 1)); // true
console.log(isEqual(1, 2)); // false
console.log(isEqual("hello", "hello")); // true
console.log(isEqual("hello", "world")); // false
console.log(isEqual(true, true)); // true
console.log(isEqual(true, false)); // false
console.log(isEqual(null, null)); // true
console.log(isEqual(undefined, undefined)); // true
console.log(isEqual(null, undefined)); // false

console.log(isEqual(NaN, NaN)); // true
console.log(isEqual(NaN, 1)); // false
console.log(isEqual(NaN, "NaN")); // false

console.log(isEqual([1, 2, 3], [1, 2, 3])); // true
console.log(isEqual([1, 2, 3], [3, 2, 1])); // false
console.log(isEqual([1, [2, 3]], [1, [2, 3]])); // true
console.log(isEqual([1, [2, 3]], [1, [3, 2]])); // false
console.log(isEqual([], [])); // true
console.log(isEqual([1], [])); // false

console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })); // false
console.log(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false
console.log(isEqual({}, {})); // true

console.log(isEqual([1, { a: 2 }], [1, { a: 2 }])); // true
console.log(isEqual({ a: [1, 2], b: 3 }, { a: [1, 2], b: 3 })); // true
console.log(isEqual({ a: [1, 2], b: 3 }, { a: [1, 2, 3], b: 3 })); // false
console.log(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])); // true

// TODO need to fix
console.log(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })); // true
