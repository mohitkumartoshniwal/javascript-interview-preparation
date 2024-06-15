const arr1 = [0, 1, [2, [3, [4, 5]]]];

// console.log(arr1.flat());
// console.log(arr1.flat(2));

function flat(array, depth = 1) {
  let result = [];
  array.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flat(item, depth - 1));
    } else {
      result.push(item);
    }
  });

  return result;
}

console.log(flat(arr1));
console.log(flat(arr1, 2));
