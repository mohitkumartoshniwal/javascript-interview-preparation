const array1 = [5, 12, 8, 130, 44];

// console.log(array1.at(0));
// console.log(array1.at(-1));

// Array.prototype.pat = function (index) {
//   if (index < -this.length || index >= this.length) {
//     return undefined;
//   }

//   if (index >= 0) {
//     return this[index];
//   } else if (index < 0) {
//     return this[this.length + index];
//   }
// };

// console.log(array1.pat(0));
// console.log(array1.pat(-1));

function at(array, index) {
  if (index < -array.length || index >= array.length) {
    return undefined;
  }

  if (index >= 0) {
    return array[index];
  } else if (index < 0) {
    return array[array.length + index];
  }
}

console.log(at(array1, 0));
console.log(at(array1, -1));
