const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

// const result = words.filter((word) => word.length > 6);

// console.log(result);

function filter(array, callbackFn) {
  let result = [];
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (callbackFn(value, index, array)) {
      result.push(value);
    }
  }
  return result;
}

const result = filter(words, (word) => word.length > 6);
console.log(result);
