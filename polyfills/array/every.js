const array1 = [1, 30, 39, 29, 10, 13];

const isBelowThreshold = (currentValue) => currentValue > 40;
// console.log(array1.every(isBelowThreshold));

function every(array, callbackFn) {
  for (let index = 0; index < array.length; index++) {
    if (!callbackFn(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

console.log(every(array1, isBelowThreshold));
