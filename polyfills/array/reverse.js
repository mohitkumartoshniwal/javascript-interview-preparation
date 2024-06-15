const array1 = ["one", "two", "three"];
// const reversed = array1.reverse();
// console.log(reversed);
// console.log(array1);

function reverse(array) {
  for (let index = 0; index < array.length / 2; index++) {
    // [array[array.length - 1 - index], array[index]] = [
    //   array[index],
    //   array[array.length - 1 - index],
    // ];
    let temp = array[index];
    array[index] = array[array.length - 1 - index];
    array[array.length - 1 - index] = temp;
  }
  return array;
}

const reversed = reverse(array1);
console.log(reversed);
console.log(array1);
