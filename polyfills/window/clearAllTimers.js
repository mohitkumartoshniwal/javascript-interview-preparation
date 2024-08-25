// TODO need to add more tests and rechcek the logic

(function () {
  // Map to keep track of all active timers
  const timersMap = new Map();
  // Counter to generate unique IDs for timers
  let nextId = 1;
  // Constants to differentiate between timeout and interval timers
  const TIMEOUT = "TIMEOUT";
  const INTERVAL = "INTERVAL";

  //   globalThis wil be window in case of browser
  // Preserve the native implementations of setTimeout and clearTimeout
  const nativeSetTimeout = globalThis.setTimeout;
  const nativeClearTimeout = globalThis.clearTimeout;

  // Preserve the native implementations of setInterval and clearInterval
  const nativeSetInterval = globalThis.setInterval;
  const nativeClearInterval = globalThis.clearInterval;

  // Override the native setTimeout
  globalThis.setTimeout = (cb, delay, ...args) => {
    // Generate a unique ID for this timeout
    const id = nextId++;

    // Schedule the callback using the native setTimeout
    const timerId = nativeSetTimeout(
      () => {
        cb(...args); // Execute the callback with provided arguments
        timersMap.delete(id); // Clean up the map after execution
      },
      delay,
      ...args
    );

    // Store the timer ID and type in the timersMap
    timersMap.set(id, {
      type: TIMEOUT,
      timerId,
    });

    // Return the unique ID
    return id;
  };

  // Override the native clearTimeout
  globalThis.clearTimeout = (id) => {
    // Look up the timer in the timersMap
    const timer = timersMap.get(id);

    // If the timer exists and is of type TIMEOUT, clear it
    if (timer && timer.type === TIMEOUT) {
      nativeClearTimeout(timer.timerId);
      timersMap.delete(id); // Remove the timer from the map
    }
  };

  // Override the native setInterval
  globalThis.setInterval = (cb, interval, ...args) => {
    // Generate a unique ID for this interval
    const id = nextId++;

    // Schedule the callback using the native setInterval
    const timerId = nativeSetInterval(cb, interval, ...args);

    // Store the timer ID and type in the timersMap
    timersMap.set(id, {
      type: INTERVAL,
      timerId,
    });

    // Return the unique ID
    return id;
  };

  // Override the native clearInterval
  globalThis.clearInterval = (id) => {
    // Look up the timer in the timersMap
    const timer = timersMap.get(id);

    // If the timer exists and is of type INTERVAL, clear it
    if (timer && timer.type === INTERVAL) {
      nativeClearInterval(timer.timerId);
      timersMap.delete(id); // Remove the timer from the map
    }
  };

  // Custom function to clear all active timers
  globalThis.clearAllTimers = () => {
    // Iterate over all timers in the timersMap
    timersMap.forEach((timer) => {
      if (timer.type === TIMEOUT) {
        // Clear timeout timers
        nativeClearTimeout(timer.timerId);
      } else if (timer.type === INTERVAL) {
        // Clear interval timers
        nativeClearInterval(timer.timerId);
      }
    });
    // Clear all entries from the timersMap
    timersMap.clear();
  };
})();

// Test custom setTimeout
const timeoutId = setTimeout(
  (message) => console.log(`Timeout executed with message: "${message}"`),
  1000,
  "Hello after 1 second!"
);

// Clear the timeout before it executes
setTimeout(() => {
  clearTimeout(timeoutId);
  console.log("Timeout cleared before execution");
}, 500); // Clear after 500ms

// Test custom setInterval
const intervalId = setInterval(
  (message) => console.log(`Interval executed with message: "${message}"`),
  1000,
  "Hello every second!"
);

// Clear the interval after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Interval cleared after 5 seconds");
}, 5000); // Clear after 5000ms

// Test clearAllTimers function

const timeoutId2 = setTimeout(
  (message) => console.log(`This should not execute: "${message}"`),
  3000,
  "Hello after 3 seconds!"
);

const intervalId2 = setInterval(
  (message) => console.log(`This should not execute: "${message}"`),
  1000,
  "Hello every second!"
);

// Clear all timers after 1 second
setTimeout(() => {
  clearAllTimers();
  console.log("All timers cleared");

  // Verify if timers are cleared
  console.log("Verifying if timers are cleared:");
  // The following should not print anything if all timers are cleared
  // Wait a bit longer to ensure all timers are processed
  setTimeout(() => {
    clearTimeout(timeoutId2);
    clearInterval(intervalId2);
  }, 500); // Short delay for checking
}, 1000); // Delay before clearing all timers

// OUTPUT:

// Timeout cleared before execution
// Interval executed with message: "Hello every second!"
// This should not execute: "Hello every second!"
// All timers cleared
