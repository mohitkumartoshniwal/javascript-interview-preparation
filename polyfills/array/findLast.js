const array1 = [5, 12, 8, 130, 44];

// const found = array1.findLast((element) => element > 50);
// console.log(found);

function findLast(array, callbackFn) {
  for (let index = array.length - 1; index >= 0; index--) {
    const value = array[index];
    if (callbackFn(value, index, array)) {
      return value;
    }
  }
  return undefined;
}

const found = findLast(array1, (element) => element > 50);
console.log(found);
