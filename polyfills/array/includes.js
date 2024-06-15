const array1 = [1, 2, 3];

// console.log(array1.includes(2));

function includes(array, searchElement, fromIndex = 0) {
  for (let index = fromIndex; index < array.length; index++) {
    const value = array[index];
    if (value === searchElement) {
      return true;
    }
  }

  return false;
}

console.log(includes(array1, 2));
