/**
 *
 * @param {unknown} value
 * @returns {string}
 */
function stringify(value) {
  if (isReturnTypeNull(value)) {
    return `null`;
  }

  if (isReturnTypeIgnorable(value)) {
    return undefined;
  }

  if (typeof value === "object" && value !== null && value instanceof Date) {
    return `"${value.toISOString()}"`;
  }

  if (typeof value === "bigint") {
    throw new Error("TypeError: Do not know how to serialize a BigInt");
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return `${value}`;
  }

  if (typeof value === "object" && Array.isArray(value)) {
    const result = [];

    value.forEach((elem) => {
      result.push(stringify(elem));
    });

    return `[${result.join(",")}]`;
  }

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const result = [];

    const keys = Object.keys(value);

    for (const key of keys) {
      const stringifiedKeyValue = stringify(value[key]);
      if (stringifiedKeyValue !== undefined) {
        result.push(`"${key}":${stringifiedKeyValue}`);
      }
    }

    return `{${result.join(",")}}`;
  }
}

/**
 *
 * @param {unknown} value
 * @returns {boolean}
 */
function isReturnTypeNull(value) {
  if (value === null && typeof value === "object") {
    return true;
  } else if (typeof value === "number" && Number.isNaN(value)) {
    return true;
  } else if (typeof value === "number" && !Number.isFinite(value)) {
    return true;
  }
  return false;
}

/**
 *
 * @param {unknown} value
 * @returns {boolean}
 */
function isReturnTypeIgnorable(value) {
  if (typeof value === "symbol") {
    return true;
  } else if (value === undefined) {
    return true;
  } else if (typeof value === "function") {
    return true;
  }
  return false;
}
console.log(stringify(42)); // Expected: '42'
console.log(stringify(42) === JSON.stringify(42)); // Expected: true

console.log(stringify(null)); // Expected: 'null'
console.log(stringify(null) === JSON.stringify(null)); // Expected: true

console.log(stringify(true)); // Expected: 'true'
console.log(stringify(true) === JSON.stringify(true)); // Expected: true

console.log(stringify(false)); // Expected: 'false'
console.log(stringify(false) === JSON.stringify(false)); // Expected: true

console.log(stringify([1, "foo", null, false])); // Expected: '[1,"foo",null,false]'
console.log(
  stringify([1, "foo", null, false]) === JSON.stringify([1, "foo", null, false])
); // Expected: true

console.log(stringify({ key: "value", number: 123, bool: true })); // Expected: '{"key":"value","number":123,"bool":true}'
console.log(
  stringify({ key: "value", number: 123, bool: true }) ===
    JSON.stringify({ key: "value", number: 123, bool: true })
); // Expected: true

console.log(stringify(undefined)); // Expected: undefined
console.log(stringify(undefined) === JSON.stringify(undefined)); // Expected: true

console.log(stringify({ key: undefined, func: () => {}, bool: true })); // Expected: '{"bool":true}'
console.log(
  stringify({ key: undefined, func: () => {}, bool: true }) ===
    JSON.stringify({ key: undefined, func: () => {}, bool: true })
); // Expected: true

console.log(stringify({ date: new Date("2024-01-01T00:00:00Z") })); // Expected: '{"date":"2024-01-01T00:00:00.000Z"}'
console.log(
  stringify({ date: new Date("2024-01-01T00:00:00Z") }) ===
    JSON.stringify({ date: new Date("2024-01-01T00:00:00Z") })
); // Expected: true

console.log(stringify("Hello, World!")); // Expected: '"Hello, World!"'
console.log(stringify("Hello, World!") === JSON.stringify("Hello, World!")); // Expected: true

// Example 1: Nested objects
const nestedObject = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    zip: "12345",
  },
};
console.log(stringify(nestedObject)); // Expected: '{"name":"John","age":30,"address":{"street":"123 Main St","city":"Anytown","zip":"12345"}}'
console.log(stringify(nestedObject) === JSON.stringify(nestedObject)); // Expected: true

// Example 2: Nested arrays
const nestedArray = [1, [2, 3], [4, [5, 6]]];
console.log(stringify(nestedArray)); // Expected: '[1,[2,3],[4,[5,6]]]'
console.log(stringify(nestedArray) === JSON.stringify(nestedArray)); // Expected: true

// Example 3: Array of objects
const arrayOfObjects = [
  { id: 1, value: "a" },
  { id: 2, value: "b" },
];
console.log(stringify(arrayOfObjects)); // Expected: '[{"id":1,"value":"a"},{"id":2,"value":"b"}]'
console.log(stringify(arrayOfObjects) === JSON.stringify(arrayOfObjects)); // Expected: true

// Example 4: Object containing an array and another object
const complexObject = {
  name: "Alice",
  data: [1, 2, { nested: "value" }],
  meta: { created: "2024-01-01", updated: "2024-01-02" },
};
console.log(stringify(complexObject)); // Expected: '{"name":"Alice","data":[1,2,{"nested":"value"}],"meta":{"created":"2024-01-01","updated":"2024-01-02"}}'
console.log(stringify(complexObject) === JSON.stringify(complexObject)); // Expected: true

// Example 5: Object with mixed nested arrays and objects
const mixedNested = {
  a: [1, { b: [2, { c: 3 }] }],
  d: { e: "text", f: [4, 5] },
};
console.log(stringify(mixedNested)); // Expected: '{"a":[1,{"b":[2,{"c":3}]}],"d":{"e":"text","f":[4,5]}}'
console.log(stringify(mixedNested) === JSON.stringify(mixedNested)); // Expected: true

// Example 6: BigInt test case
const bigIntObject = {
  big: BigInt(12345678901234567890),
  small: BigInt(1),
};
try {
  console.log(stringify(bigIntObject)); // Expected: Error thrown
} catch (e) {
  console.log(e.message); // Expected: 'TypeError: Do not know how to serialize a BigInt'
}

// EDGE CASE TODO
console.log(stringify([undefined, function () {}, Symbol("test")])); // Expected: '[null,null,null]'
console.log(
  stringify([undefined, function () {}, Symbol("test")]) ===
    JSON.stringify([undefined, function () {}, Symbol("test")])
); // Expected: true
