// IMPORTANT The main concept to solve the below problem is that each object in Javascript has an internal property called [[Class]]
// which we can access using  Object.prototype.toString

/**
 * Retrieves the type of a given data value in a human-readable format.
 *
 * @param {unknown} data - The value whose type is to be determined.
 * @returns {string} - The type of the data value, in lowercase (e.g., "object", "array").
 */
function getTypeOf(data) {
  // Use Object.prototype.toString to get a detailed string representation of the data type.
  const type = Object.prototype.toString.call(data); // [object type]

  // Extract the type name from the string (e.g., "[object Array]" becomes "Array").
  // Remove the surrounding "[object " and "]" and convert to lowercase.
  return type.slice(1, -1).split(" ")[1].toLowerCase();
}

// Using Object.prototype.toString to determine the type of a value is preferred over using toString directly due to its more precise and reliable type detection. Here’s why:

const arr = [1, 2, 3];
const obj = { key: "value" };

console.log(arr.toString()); // Expected: '1,2,3' (String representation, not type)
console.log(obj.toString()); // Expected: '[object Object]' (Not specific to the type)
// Since each derived object overrides toString method.

console.log(Object.prototype.toString.call(arr)); // Expected: '[object Array]'
console.log(Object.prototype.toString.call(obj)); // Expected: '[object Object]'

console.log("\n Test Cases: \n");

// Array
const arr2 = [1, 2, 3];
console.log(getTypeOf(arr)); // Expected: 'array'

// Plain Object
const obj2 = { key: "value" };
console.log(getTypeOf(obj)); // Expected: 'object'

// Date
const date = new Date();
console.log(getTypeOf(date)); // Expected: 'date'

// Regular Expression
const regex = /abc/;
console.log(getTypeOf(regex)); // Expected: 'regexp'

// Function
const func = function () {};
console.log(getTypeOf(func)); // Expected: 'function'

// Null (typeof null is 'object', which is misleading)
const nullValue = null;
console.log(getTypeOf(nullValue)); // Expected: 'null'

// Undefined
const undefinedValue = undefined;
console.log(getTypeOf(undefinedValue)); // Expected: 'undefined'

// BigInt
const bigIntValue = BigInt(12345678901234567890);
console.log(getTypeOf(bigIntValue)); // Expected: 'bigint'

// Symbol
const symbolValue = Symbol("description");
console.log(getTypeOf(symbolValue)); // Expected: 'symbol'

// Map
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
console.log(getTypeOf(map)); // Expected: 'map'

// Set
const set = new Set();
set.add(1);
set.add(2);
console.log(getTypeOf(set)); // Expected: 'set'

// Primitive Types
console.log(getTypeOf(42)); // Expected: 'number'
console.log(getTypeOf("Hello, World!")); // Expected: 'string'
console.log(getTypeOf(true)); // Expected: 'boolean'
