const array1 = ["a", "b", "c"];
// const array2 = array1.concat(["d"], "G");
// console.log({ array1, array2 });

function concat(array, ...values) {
  const result = [...array];

  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        result.push(value[index]);
      }
    } else {
      result.push(value);
    }
  }

  return result;
}

const array2 = concat(array1, ["d"], "G");
console.log({ array1, array2 });
