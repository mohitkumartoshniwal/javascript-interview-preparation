const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return curried.bind(null, ...args);
    }
  };
};

const add = (a, b, c) => {
  return a + b + c;
};

const curriedAdd = curry(add);
console.log(curriedAdd(1, 2, 3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2));
console.log(curriedAdd(1)(2, 3, 4, 5));

// Another way
function curry2 (fn) { 
  function curried(...args){
    function next(...nextArgs){
      if(nextArgs.length === 0){
        return fn(...args)
      } else {
        return curried(...args,...nextArgs)
      }
    }
    return next
  }
  return curried
}

const curriedAdd2 = curry2(add);
console.log(curriedAdd2(1, 2, 3)());
console.log(curriedAdd2(1, 2)(3)());
console.log(curriedAdd2(1)(2, 3)());
console.log(curriedAdd2(1)(2)(3)());
console.log(curriedAdd2(1, 2)(3)());
console.log(curriedAdd2(1)(2, 3, 4, 5)());
