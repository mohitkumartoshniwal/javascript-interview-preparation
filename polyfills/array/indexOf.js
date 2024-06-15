const beasts = ["ant", "bison", "camel", "duck", "bison"];

// console.log(beasts.indexOf("bison"));

function indexOf(array, searchElement, fromIndex = 0) {
  for (let index = fromIndex; index < array.length; index++) {
    const value = array[index];
    if (value === searchElement) {
      return index;
    }
  }

  return -1;
}

console.log(indexOf(beasts, "bison"));
