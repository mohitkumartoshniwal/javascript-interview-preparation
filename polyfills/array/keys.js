const array1 = ["a", "b", "c"];

// const iterator = array1.keys();
// for (const key of iterator) {
//   console.log(key);
// }

function keys(array) {
  function* generator() {
    for (let index = 0; index < array.length; index++) {
      yield index;
    }
  }
  return generator();
}

const iterator = array1.keys();
for (const key of iterator) {
  console.log(key);
}
