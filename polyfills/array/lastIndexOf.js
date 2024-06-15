const beasts = ["ant", "bison", "camel", "duck", "bison"];

// console.log(beasts.lastIndexOf("bison"));

function lastIndexOf(array, searchElement) {
  for (let index = array.length - 1; index >= 0; index--) {
    const value = array[index];
    if (value === searchElement) {
      return index;
    }
  }

  return -1;
}

console.log(lastIndexOf(beasts, "bison"));
