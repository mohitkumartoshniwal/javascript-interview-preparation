const add = (a, b, c) => {
  return a + b + c;
};

const addCurry = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
};
console.log(addCurry(2).toString());
console.log(addCurry(2)(3).toString());
console.log(addCurry(2)(3)(5));
