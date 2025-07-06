const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
// const initialValue = 0;
// const sumWithInitial = array1.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   initialValue
// );

function reduce(array, callbackFn, initialValue) {
  let accumulator = initialValue;
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (accumulator) {
      accumulator = callbackFn(accumulator, value, index, array);
    } else {
      accumulator = value;
    }
  }

  return accumulator;
}

const initialValue = 0;
const sumWithInitial = reduce(
  array1,
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);


/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const noInitialValue = initialValue === undefined;

  if (noInitialValue && this.length === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  for (let index = startingIndex; index < this.length; index++) {
    let value = this[index];

    if (value) { // to handle sparse arrays
      accumulator = callbackFn(accumulator, value, index, this);
    }
  }

  return accumulator;
};
