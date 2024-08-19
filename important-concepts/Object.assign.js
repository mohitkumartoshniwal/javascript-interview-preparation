function ObjectAssign(target, ...sources) {
  // Ensure the target is an object; throw an error if it's null or undefined
  if (target === null || target === undefined) {
    throw new TypeError("Target must be an object");
  }

  // Convert target to an object if it's not already
  target = Object(target);

  // Iterate over each source object provided as arguments
  for (let source of sources) {
    // Skip null or undefined sources
    if (source === null || source === undefined) {
      continue;
    }

    // Convert source to an object if it's not already
    source = Object(source);
    // By ensuring that target and source are objects, one avoid issues related
    // to property access and assignment that would otherwise occur with primitives.
    // This conversion makes sure that one can safely use methods like
    // Object.getOwnPropertyDescriptor and Object.defineProperty.

    // Get all property keys (including symbols) from the source object
    const keys = Reflect.ownKeys(source);
    // Get property descriptors for all properties of the source object
    const descriptors = Object.getOwnPropertyDescriptors(source);

    // Iterate over each key in the source object
    keys.forEach((key) => {
      // Get the property descriptor for the target object for the current key
      const targetDescriptor = Object.getOwnPropertyDescriptor(target, key);

      // If the target property exists and is not writable, throw an error
      if (targetDescriptor && targetDescriptor.writable === false) {
        throw new Error(`Property ${key} is not writable to target`);
      }

      // Only copy properties if they are enumerable
      if (descriptors[key].enumerable) {
        target[key] = source[key];
      }
    });
  }

  // Return the updated target object
  return target;
}

// Test Case 1: Basic Usage
const target1 = { a: 1 };
const source1 = { b: 2, c: 3 };
console.log(ObjectAssign(target1, source1)); // { a: 1, b: 2, c: 3 }

// Test Case 2: Overwriting Existing Properties
const target2 = { a: 1, b: 2 };
const source2 = { b: 3, c: 4 };
console.log(ObjectAssign(target2, source2)); // { a: 1, b: 3, c: 4 }

// Test Case 3: Handling Non-enumerable Properties
const target3 = {};
const source3 = Object.defineProperty({}, "a", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true,
});
console.log(ObjectAssign(target3, source3)); // {} (non-enumerable properties are not copied)

// Test Case 4: Handling Symbol Properties
const symbolKey = Symbol("symbolKey");
const target4 = {};
const source4 = { [symbolKey]: "symbolValue" };
console.log(ObjectAssign(target4, source4)); // { [Symbol('symbolKey')]: 'symbolValue' }

// Test Case 5: Null and Undefined Sources
const target6 = { a: 1 };
console.log(ObjectAssign(target6, null, undefined, { b: 2 })); // { a: 1, b: 2 } (null and undefined sources are ignored)

// Test Case 6: Target as Primitive
const target7 = 3; // primitive value
const source7 = { a: 1 };
console.log(ObjectAssign(target7, source7)); // [Number: 3] { a: 1 } (target is converted to an object)

// Test Case 7: Target as Object and Multiple Sources
const target8 = { a: 1 };
const source8 = { b: 2 };
const source9 = { c: 3 };
console.log(ObjectAssign(target8, source8, source9)); // { a: 1, b: 2, c: 3 }

// Test Case 8: Throw Error for Non-writable Target Property
const target9 = Object.defineProperty({}, "a", {
  value: 1,
  writable: false,
  enumerable: true,
});
const source10 = { a: 2 };
try {
  console.log(ObjectAssign(target9, source10));
} catch (e) {
  console.error(e.message); // Property a is not writable to target
}
