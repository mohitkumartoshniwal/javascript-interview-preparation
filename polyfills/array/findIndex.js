const array1 = [5, 12, 8, 130, 44];

// const found = array1.findIndex((element) => element > 10);
// console.log(found);

function findIndex(array, callbackFn) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (callbackFn(value, index, array)) {
      return index;
    }
  }
  return -1;
}

const found = findIndex(array1, (element) => element > 10);
console.log(found);
