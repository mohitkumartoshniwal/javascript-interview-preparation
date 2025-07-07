/**
// Example function with callback as last argument
// The callback has the signature `(err, value) => any`
function foo(url, options, callback) {
  apiCall(url, options)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}

const promisifiedFoo = promisify(foo);
const data = await promisifiedFoo('example.com', { foo: 1 });

**/

/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // callback needs to be the last argument since that is what  func expects
      func.call(this, ...args, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  };
}
