const array1 = ["a", "b", "c"];

// const iterator = array1.values();
// for (const key of iterator) {
//   console.log(key);
// }

function values(array) {
  function* generator() {
    for (let index = 0; index < array.length; index++) {
      yield array[index];
    }
  }
  return generator();
}

const iterator = values(array1);
for (const key of iterator) {
  console.log(key);
}
