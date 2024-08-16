/**
 *
 * @param {string} input
 * @param {number} start
 * @param {number} end
 * @returns {string}
 */
function getPart(input, start, end) {
  return input.substring(start, end);
}

/**
 *
 * @param {string} input
 * @returns {string}
 */
function getUpperCasePart(input) {
  return input.toUpperCase();
}

/**
 *
 * @param {string} input
 * @returns {Promise<string>}
 */
async function getReversedPartAsync(input) {
  return new Promise((res) => {
    setTimeout(() => {
      let reversedString = input.split("").reverse().join("");
      res(reversedString);
    }, 2000);
  });
}

console.group("Without pipe sync example");
let res1 = getPart("Hello world", 3, 6);
let res2 = getUpperCasePart(res1);
console.log({ res1 });
console.log({ res2 });
console.groupEnd("Without pipe sync example");

/*
Without pipe sync example
  { res1: 'lo ' }
  { res2: 'LO ' }
*/

console.group("Without pipe async example");
let res3 = getPart("Hello world", 3, 6);
let res4 = getUpperCasePart(res3);
getReversedPartAsync(res4).then((res5) => {
  console.group("Without pipe async example");
  console.log({ res5 });
  console.groupEnd("Without pipe async example");
});
console.log({ res3 });
console.log({ res4 });
console.groupEnd("Without pipe async example");

/*
Without pipe async example
  { res3: 'lo ' }
  { res4: 'LO ' }
{ res5: ' OL' }
*/

// 1. Using for loop

function pipe(...fns) {
  return function (...initialArgs) {
    let result = initialArgs;

    fns.forEach((fn, index) => {
      // Spread the original arguments only for the first function
      result = index === 0 ? fn(...result) : fn(result);
    });

    return result;
  };
}

function pipeAsync(...fns) {
  return async function (...initialArgs) {
    let result = initialArgs;

    for (let index = 0; index < fns.length; index++) {
      const fn = fns[index];

      result = index === 0 ? await fn(...result) : await fn(result);
    }

    return result;
  };
}

console.group("With pipe for loop sync example");
let pipeSync1 = pipe(getPart, getUpperCasePart);
console.log(pipeSync1("Hello world", 3, 6));
console.groupEnd("With pipe for loop sync example");

/*
With pipe for loop sync example
  LO
*/

let pipeAsync1 = pipe(getPart, getUpperCasePart, getReversedPartAsync);
pipeAsync1("Hello world", 3, 6).then((res) => {
  console.group("With pipe for loop async example");
  console.log(res);
  console.groupEnd("With pipe for loop async example");
});

/*
With pipe for loop async example
   OL
*/

// 2. Using reduce

function pipe2(...fns) {
  return function (...initialArgs) {
    let result = fns.reduce((acc, fn, index) => {
      return index === 0 ? fn(...acc) : fn(acc);
    }, initialArgs);
    return result;
  };
}

// TODO need to check async logic once more
function pipeAsync2(...fns) {
  return function (...initialArgs) {
    let result = fns.reduce((acc, fn, index) => {
      return acc.then((res) => {
        return index === 0 ? fn(...res) : fn(res);
      });
    }, Promise.resolve(initialArgs));
    return result;
  };
}

console.group("With pipe reduce sync example");
let pipeSync2 = pipe2(getPart, getUpperCasePart);
console.log(pipeSync2("Hello world", 3, 6));
console.groupEnd("With pipe reduce sync example");

/*
With pipe reduce sync example
  LO
*/

let async2 = pipeAsync2(getPart, getUpperCasePart, getReversedPartAsync);
async2("Hello world", 3, 6).then((res) => {
  console.group("With pipe reduce async example");
  console.log(res);
  console.groupEnd("With pipe reduce async example");
});

/*
With pipe reduce async example
   OL
*/
