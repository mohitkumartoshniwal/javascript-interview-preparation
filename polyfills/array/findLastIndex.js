const array1 = [5, 12, 8, 130, 44];

// const found = array1.findLastIndex((element) => element > 10);
// console.log(found);

function findLastIndex(array, callbackFn) {
  for (let index = array.length - 1; index >= 0; index--) {
    const value = array[index];
    if (callbackFn(value, index, array)) {
      return index;
    }
  }
  return -1;
}

const found = findLastIndex(array1, (element) => element > 10);
console.log(found);
