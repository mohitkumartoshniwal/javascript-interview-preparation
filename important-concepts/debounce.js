const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

let startTime = Date.now();

function fetchData() {
  console.log(`fetchData called after ${Date.now() - startTime}ms`);
}

// setTimeout(fetchData, 30);
// setTimeout(fetchData, 40);

const debouncedFn = debounce(fetchData, 100);

setTimeout(debouncedFn, 30);
setTimeout(debouncedFn, 40);



function debounce2(fn, delay){
  let timer;

  return function(...args) {
    const context = this
    clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(context,args)
    }, delay)
  }
}
