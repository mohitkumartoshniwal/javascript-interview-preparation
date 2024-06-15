const animals = ["ant", "bison", "camel", "duck", "elephant"];

// console.log(animals.slice(2));

function slice(array, startIndex = 0, endIndex = array.length) {
  const result = [];
  for (let index = startIndex; index < endIndex; index++) {
    const value = array[index];
    if (index < array.length) {
      result.push(value);
    }
  }
  return result;
}

console.log(slice(animals, 2));
console.log(slice(animals, 2, 4));
