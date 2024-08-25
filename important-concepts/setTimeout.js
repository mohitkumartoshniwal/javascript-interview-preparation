// IMPORTANT requestIdleCallback is browser web api

/**
 * Creates a custom setTimeout function with encapsulated state.
 *
 * @returns {Object} - An object with customSetTimeout and customClearTimeout methods.
 */
function createCustomSetTimeout() {
  // Encapsulated state
  const timeoutMap = new Map();
  let nextId = 1;

  /**
   * Custom implementation of setTimeout using requestIdleCallback.
   *
   * @param {Function} callback - The function to execute after the delay.
   * @param {number} delay - The number of milliseconds to wait before executing the callback.
   * @param {...*} args - The arguments to pass to the callback when it is executed.
   * @returns {number} - The timeout ID which can be used to cancel the timeout with customClearTimeout.
   */
  function customSetTimeout(callback, delay, ...args) {
    const id = nextId++;
    let startTime = Date.now();

    // Create an idle callback
    const idleCallbackId = requestIdleCallback(
      () => {
        if (Date.now() - startTime >= delay) {
          callback(...args); // Pass arguments to the callback
          timeoutMap.delete(id); // Remove the timeout entry after execution
        } else {
          // Schedule the callback again if not enough time has passed
          customSetTimeout(callback, delay - (Date.now() - startTime), ...args);
        }
      },
      { timeout: delay }
    );

    // Store the timeout ID and corresponding callback ID
    timeoutMap.set(id, idleCallbackId);

    // Return the timeout ID to allow cancellation
    return id;
  }

  /**
   * Custom implementation of clearTimeout using cancelIdleCallback.
   *
   * @param {number} id - The timeout ID returned by customSetTimeout.
   */
  function customClearTimeout(id) {
    const idleCallbackId = timeoutMap.get(id);
    if (idleCallbackId) {
      cancelIdleCallback(idleCallbackId);
      timeoutMap.delete(id); // Remove the timeout entry after cancellation
    }
  }

  // Return an object with the custom functions
  return {
    customSetTimeout,
    customClearTimeout,
  };
}

// Usage:
const { customSetTimeout, customClearTimeout } = createCustomSetTimeout();

const timeoutId = customSetTimeout(
  (message) => {
    console.log(message);
  },
  2000,
  "Custom timeout callback executed!"
); // Executes the callback after approximately 2000 milliseconds with arguments

const timeoutId2 = customSetTimeout(
  (message) => {
    console.log(message);
  },
  2500,
  "Custom timeout callback executed 2!"
); // Executes the callback after approximately 2000 milliseconds with arguments

// Optionally clear the timeout if needed
customClearTimeout(timeoutId2);
