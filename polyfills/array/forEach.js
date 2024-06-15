const array1 = ["a", "b", "c"];
// array1.forEach((element) => console.log(element));

function forEach(array, callbackFn) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    callbackFn(value, index, array);
  }
}
forEach(array1, (element) => console.log(element));
