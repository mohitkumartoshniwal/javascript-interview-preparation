Promise.customAll = function (promises) {
  let result = [];
  let resolvedPromises = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(result);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // to handle primitive values
        .then((value) => {
          result[index] = value;
          resolvedPromises++;

          if (resolvedPromises === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

const promise1 = Promise.customAll([]);

promise1
  .then((value) => console.log("Resolved with 1 - ", value))
  .catch((value) => console.error("Rejected with 1 - ", value));
// Resolved with 1 -  []

const promise2 = Promise.customAll([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  Promise.resolve(3),
  4,
]);

promise2
  .then((value) => console.log("Resolved with 2 - ", value))
  .catch((value) => console.error("Rejected with 2 - ", value));
// Resolved with 2 -  [ 1, 2, 3, 4 ]

const promise3 = Promise.customAll([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  Promise.resolve(3),
  Promise.reject(4),
  Promise.reject(5),
]);

promise3
  .then((value) => console.log("Resolved with 3 - ", value))
  .catch((value) => console.error("Rejected with 3 - ", value));
// Rejected with 3 -  4

const promise4 = Promise.customAll([
  null,
  undefined,
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  {},
  3,
  "hello",
  true,
]);

promise4
  .then((value) => console.log("Resolved with 4 - ", value))
  .catch((value) => console.error("Rejected with 4 - ", value));
// Resolved with 4 -  [ null, undefined, 2, {}, 3, 'hello', true ]
