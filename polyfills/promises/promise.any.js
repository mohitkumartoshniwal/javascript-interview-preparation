Promise.customAny = function (promises) {
  let errors = [];
  let rejectedPromises = 0;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      reject(new AggregateError(errors, "Empty Array"));
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // to handle primitive values
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          errors[index] = reason;
          rejectedPromises++;

          if (rejectedPromises === promises.length) {
            reject(new AggregateError(errors, "All promises rejected"));
          }
        });
    });
  });
};

const promise1 = Promise.customAny([]);

promise1
  .then((value) => console.log("Resolved with 1 - ", value))
  .catch((value) => console.error("Rejected with 1 - ", value));
/*
Rejected with 1 -  AggregateError: Empty Array
    at E:\interview-preparation\javascript-interview-preparation\polyfills\promises\promise.any.js:7:14
    at new Promise (<anonymous>)
    at Promise.customAny (E:\interview-preparation\javascript-interview-preparation\polyfills\promises\promise.any.js:5:10)   
    at Object.<anonymous> (E:\interview-preparation\javascript-interview-preparation\polyfills\promises\promise.any.js:27:26) 
    at Module._compile (node:internal/modules/cjs/loader:1256:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at Module._load (node:internal/modules/cjs/loader:960:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:86:12)
    at node:internal/main/run_main_module:23:47 {
  [errors]: []
}
*/

const promise2 = Promise.customAny([
  Promise.resolve(1),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  Promise.resolve(3),
  4,
]);

promise2
  .then((value) => console.log("Resolved with 2 - ", value))
  .catch((value) => console.error("Rejected with 2 - ", value));
// Resolved with 2 -  1

const promise3 = Promise.customAny([
  Promise.reject(1),
  new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)),
  Promise.reject(3),
  Promise.reject(4),
  Promise.reject(5),
]);

promise3
  .then((value) => console.log("Resolved with 3 - ", value))
  .catch((value) => console.error("Rejected with 3 - ", value));
/*
 Rejected with 3 -  AggregateError: All promises rejected
    at E:\interview-preparation\javascript-interview-preparation\polyfills\promises\promise.any.js:20:20
    at runNextTicks (node:internal/process/task_queues:60:5)
    at listOnTimeout (node:internal/timers:538:9)
    at process.processTimers (node:internal/timers:512:7) {
  [errors]: [ 1, 2, 3, 4, 5 ]
  */

const promise4 = Promise.customAny([
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
// Resolved with 4 -  null
