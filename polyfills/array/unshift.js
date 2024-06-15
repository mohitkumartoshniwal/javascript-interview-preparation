const array1 = [1, 2, 3];

// console.log(array1.unshift(4, 5));
// console.log(array1);

function unshift(array, ...values) {
  let mergedArrays = [...values, ...array];
  for (let index = 0; index < mergedArrays.length; index++) {
    const value = mergedArrays[index];
    array[index] = value;
  }

  return array.length;
}

console.log(unshift(array1, 4, 5));
console.log(array1);
