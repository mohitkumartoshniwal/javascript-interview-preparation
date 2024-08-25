function ObjectIs(a, b) {
  // Special case: Both values are NaN
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // Special case: Distinguish between +0 and -0
  if (a === 0 && b === 0) {
    // 1 / 0 results in Infinity
    // 1 / -0 results in -Infinity
    return 1 / a === 1 / b;
  }

  // Default comparison
  return a === b;
}
// Primitive values
console.log(ObjectIs(0, -0) === Object.is(0, -0)); // true
console.log(ObjectIs(-0, -0) === Object.is(-0, -0)); // true
console.log(ObjectIs(NaN, NaN) === Object.is(NaN, NaN)); // true
console.log(ObjectIs(5, 5) === Object.is(5, 5)); // true
console.log(ObjectIs(5, "5") === Object.is(5, "5")); // true
console.log(ObjectIs(null, null) === Object.is(null, null)); // true
console.log(ObjectIs(undefined, null) === Object.is(undefined, null)); // true

// Object references
const obj1 = {};
const obj2 = {};
console.log(ObjectIs(obj1, obj2) === Object.is(obj1, obj2)); // true
console.log(ObjectIs(obj1, obj1) === Object.is(obj1, obj1)); // true

const arr1 = [];
const arr2 = [];
console.log(ObjectIs(arr1, arr2) === Object.is(arr1, arr2)); // true
console.log(ObjectIs(arr1, arr1) === Object.is(arr1, arr1)); // true

// Mixed object/array comparisons
console.log(ObjectIs({}, []) === Object.is({}, [])); // true
console.log(ObjectIs([], []) === Object.is([], [])); // true

// Complex nested comparisons
const nestedObj1 = { key: { nested: 1 } };
const nestedObj2 = { key: { nested: 1 } };
console.log(
  ObjectIs(nestedObj1, nestedObj2) === Object.is(nestedObj1, nestedObj2)
); // true

// Null and undefined comparisons
console.log(ObjectIs(null, undefined) === Object.is(null, undefined)); // true
console.log(ObjectIs(undefined, undefined) === Object.is(undefined, undefined)); // true
console.log(ObjectIs(null, null) === Object.is(null, null)); // true

// NaN comparisons
console.log(ObjectIs(NaN, NaN) === Object.is(NaN, NaN)); // true
