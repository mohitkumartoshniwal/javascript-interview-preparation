const array1 = ["a", "b", "c"];

// const iterator = array1.entries();
// for (const key of iterator) {
//   console.log(key);
// }

function entries(array) {
  function* generator() {
    for (let index = 0; index < array.length; index++) {
      yield [index, array[index]];
    }
  }
  return generator();
}

const iterator = entries(array1);
for (const key of iterator) {
  console.log(key);
}
