const arr = [1, [2], [3, [4]]];
// console.log(arr.flat(1));
// console.log(arr.flat(2));

// Recursive
function flattenRecursive(arr, depth = 1) {
  if (depth === 0) {
    return arr;
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!Array.isArray(element)) {
      result.push(element);
    } else {
      const flattenedArr = flattenRecursive(element, depth - 1);
      result.push(...flattenedArr);
    }
  }

  return result;
}

// console.log(flattenRecursive(arr, 1));
// console.log(flattenRecursive(arr, 2));

// Recursive
function flattenStack(arr, depth = 1) {
  const result = [];
  const stack = [];
  const newArr = arr.map((curr) => [curr, depth]);
  stack.push(...newArr);

  while (stack.length > 0) {
    const top = stack.pop();
    const [curr, depth] = top;

    if (depth === 0) {
      result.push(curr);
      continue;
    }

    if (!Array.isArray(curr)) {
      result.push(curr);
    } else {
      const newArr = curr.map((curr) => [curr, depth - 1]);
      stack.push(...newArr);
    }
  }

  return result.reverse();
}

console.log(flattenStack(arr, 1));
console.log(flattenStack(arr, 2));
