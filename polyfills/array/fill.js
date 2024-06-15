const array1 = [1, 2, 3, 4];

// console.log(array1.fill(0, 2, 4)); //  [1, 2, 0, 0]

// console.log(array1.fill(5, 1)); //  [1, 5, 5, 5]

// console.log(array1.fill(6)); //  [6, 6, 6, 6]

function fill(array, value, startIndex = 0, endIndex = array.length) {
  for (let index = startIndex; index < endIndex; index++) {
    array[index] = value;
  }
  return array;
}

console.log(fill(array1, 0, 2, 4)); //  [1, 2, 0, 0]

console.log(fill(array1, 5, 1)); //  [1, 5, 5, 5]

console.log(fill(array1, 6)); //  [6, 6, 6, 6]
