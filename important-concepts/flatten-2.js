function flatten(input) {
  let result = {};

  for (let key in input) {
    if (typeof input[key] === "object" && input[key] !== null) {
      result = { ...result, ...flatten(input[key]) };
    } else {
      result[key] = input[key];
    }
  }

  return result;
}
const obj1 = {
  a: 1,
  b: {
    c: 3,
  },
};

console.log(flatten(obj1));
