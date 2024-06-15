const array1 = [1, 2, 3];

// const firstElement = array1.shift();
// console.log(array1);

function shift(array) {
  if (array.length === 0) {
    return undefined;
  }

  let firstValue = array[0];
  for (let index = 1; index < array.length; index++) {
    const value = array[index];
    array[index - 1] = value;
  }

  array.length = array.length - 1;
  return firstValue;
}

const firstElement = shift(array1);
console.log({ firstElement, array1 });
