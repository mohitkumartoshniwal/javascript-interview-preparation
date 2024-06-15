const array1 = [5, 12, 8, 130, 44];

// const found = array1.find((element) => element > 10);

// console.log(found);

function find(array, callbackFn) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (callbackFn(value, index, array)) {
      return value;
    }
  }
  return undefined;
}

const found = find(array1, (element) => element > 10);
console.log(found);
