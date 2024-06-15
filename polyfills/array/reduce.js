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
