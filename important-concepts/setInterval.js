/**
 * Creates a custom setInterval function with encapsulated state.
 *
 * @returns {Object} - An object with customSetInterval and customClearInterval methods.
 */
function createCustomSetInterval() {
  const timeoutMap = new Map(); // Stores the timer IDs for active intervals
  let nextId = 1; // Tracks the next unique interval ID

  /**
   * Custom implementation of setInterval using Node.js setTimeout.
   *
   * @param {Function} callback - The function to execute repeatedly.
   * @param {number} interval - The number of milliseconds to wait between executions.
   * @param {...*} args - The arguments to pass to the callback when it is executed.
   * @returns {number} - The interval ID which can be used to cancel the interval with customClearInterval.
   */
  function customSetInterval(callback, interval, ...args) {
    let id = nextId++; // Generate a new unique interval ID

    // Function to schedule the next execution of the callback
    function scheduleNext() {
      const timerId = setTimeout(() => {
        callback(...args); // Execute the callback with provided arguments

        // Schedule the next execution if the interval hasn't been cleared
        if (timeoutMap.has(id)) {
          scheduleNext();
        }
      }, interval);
      timeoutMap.set(id, timerId); // Store the timer ID in the map
    }

    scheduleNext(); // Start the first execution

    return id; // Return the interval ID for later clearing
  }

  /**
   * Custom implementation of clearInterval using Node.js clearTimeout.
   *
   * @param {number} id - The interval ID returned by customSetInterval.
   */
  function customClearInterval(id) {
    const timerId = timeoutMap.get(id); // Retrieve the timer ID associated with the interval ID

    if (timerId) {
      clearTimeout(timerId); // Cancel the timeout
      timeoutMap.delete(id); // Remove the interval ID from the map
    }
  }

  return {
    customSetInterval,
    customClearInterval,
  };
}

// Usage example:
const { customSetInterval, customClearInterval } = createCustomSetInterval();

// Set up an interval that logs a message every 1000 milliseconds
const intervalId = customSetInterval(
  (message) => {
    console.log(message); // Log the message
  },
  1000, // Interval of 1000 milliseconds (1 second)
  "Custom interval callback executed!" // Message to log
);

// Optionally clear the interval after 10000 milliseconds (10 seconds)
setTimeout(() => {
  console.log("Cleared Interval");
  customClearInterval(intervalId); // Clear the interval
}, 10000);

const intervalId2 = customSetInterval(
  (message) => {
    console.log(message); // Log the message
  },
  2000,
  "Custom interval callback executed! 2" // Message to log
);

setTimeout(() => {
  console.log("Cleared Interval 2");
  customClearInterval(intervalId2); // Clear the interval
}, 5000);

// Output:

// Custom interval callback executed!
// Custom interval callback executed! 2
// Custom interval callback executed!
// Custom interval callback executed!
// Custom interval callback executed! 2
// Custom interval callback executed!
// Cleared Interval 2
// Custom interval callback executed!
// Custom interval callback executed!
// Custom interval callback executed!
// Custom interval callback executed!
// Custom interval callback executed!
// Cleared Interval
