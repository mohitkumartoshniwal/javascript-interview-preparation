Promise.customAllSettled = function (promises) {
  let result = [];
  let settledPromises = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(result);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // to handle primitive values
        .then((value) => {
          result[index] = { status: "Fulfilled", value };
          settledPromises++;

          if (settledPromises === promises.length) {
            resolve(result);
          }
        })
        .catch((reason) => {
          result[index] = { status: "Rejected", reason };
          settledPromises++;

          if (settledPromises === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

const promise1 = Promise.customAllSettled([]);

promise1
  .then((value) => console.log("Resolved with 1 - ", value))
  .catch((value) => console.error("Rejected with 1 - ", value));
// Resolved with 1 -  []

const promise2 = Promise.customAllSettled([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  Promise.resolve(3),
  4,
]);

promise2
  .then((value) => console.log("Resolved with 2 - ", value))
  .catch((value) => console.error("Rejected with 2 - ", value));
/*
Resolved with 2 -  [
  { status: 'Fulfilled', value: 1 },
  { status: 'Fulfilled', value: 2 },
  { status: 'Fulfilled', value: 3 },
  { status: 'Fulfilled', value: 4 }
]
*/

const promise3 = Promise.customAllSettled([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  Promise.resolve(3),
  Promise.reject(4),
  Promise.reject(5),
]);

promise3
  .then((value) => console.log("Resolved with 3 - ", value))
  .catch((value) => console.error("Rejected with 3 - ", value));
/*
Resolved with 3 -  [
  { status: 'Fulfilled', value: 1 },
  { status: 'Fulfilled', value: 2 },
  { status: 'Fulfilled', value: 3 },
  { status: 'Rejected', reason: 4 },
  { status: 'Rejected', reason: 5 }
]
*/

const promise4 = Promise.customAllSettled([
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
/*
Resolved with 4 -  [
  { status: 'Fulfilled', value: null },
  { status: 'Fulfilled', value: undefined },
  { status: 'Fulfilled', value: 2 },
  { status: 'Fulfilled', value: {} },
  { status: 'Fulfilled', value: 3 },
  { status: 'Fulfilled', value: 'hello' },
  { status: 'Fulfilled', value: true }
]
*/
