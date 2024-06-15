const array = [1, 2, 3, 4, 5];

const even = (element) => element % 2 === 0;
// console.log(array.some(even));

function some(array, callbackFn) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (callbackFn(value, index, array)) {
      return true;
    }
  }

  return false;
}

console.log(some(array, even));
