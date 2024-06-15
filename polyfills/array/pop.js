const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

// console.log(plants.pop());

function pop(array) {
  if (array.length === 0) {
    return undefined;
  }

  const value = array[array.length - 1];
  array.length = array.length - 1;
  return value;
}

console.log(pop(plants));
console.log(plants);
