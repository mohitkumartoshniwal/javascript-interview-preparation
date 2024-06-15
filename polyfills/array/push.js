const animals = ["pigs", "goats", "sheep"];

// const count = animals.push("cows");
// console.log(count);
// console.log(animals);

function push(array, ...values) {
  let arrayLength = array.length;
  for (let index = 0; index < values.length; index++) {
    array[arrayLength + index] = values[index];
  }
  return array.length;
}

const count = push(animals, "cows");
console.log(count);
console.log(animals);
