const throttle = (fn, delay) => {
  let timerFlag = null;

  return (...args) => {
    if (timerFlag === null) {
      fn(...args);

      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
};

let prev = Date.now();

function fetchData() {
  console.log(`fetchData called after ${Date.now() - prev}ms`);
  prev = Date.now();
}

// setInterval(fetchData, 10);

const throttledFn = throttle(fetchData, 1000);

setInterval(throttledFn, 10);
