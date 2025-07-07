/**
Implement a function deepOmit(obj, keys) that removes specified keys and their corresponding values from an object, including nested objects or arrays. It works recursively to traverse through the entire object structure, ensuring that all occurrences of the specified keys are removed at all levels. The function takes in an object (obj) and an array of string keys (keys).

Examples
deepOmit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
A more complicated example with nested objects:


const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
deepOmit(obj, ['b', 'c', 'e']); // { a: 1, f: [5, 6] }
**/

/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }

  if (isPlainObject(val)) {
    const newObj = {};

    for (let key in val) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(val[key], keys);
      }
    }
    return newObj;
  }

  return val;
}

// A helper function isPlainObject() is used to check for plain object types. Doing typeof element === 'object' && element !== null won't work because there are other values like Date and Set that will pass the check. Iterate through the keys of the object, filter out keys that are within keys, recursively call deepOmit on the values, for non-omitted keys, adding the return values to newObj.
function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
