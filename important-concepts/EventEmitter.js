/**
 * @class EventEmitter
 * A simple event emitter class that allows adding, removing, and emitting events.
 * It uses the observer design pattern to manage event listeners.
 *
 * @see '../design-patterns/observer-pattern'
 * @see '../design-patterns/pub-sub-pattern'
 */
class EventEmitter {
  constructor() {
    // A Map to store event names as keys and arrays of callback functions as values
    this.eventsMap = new Map();
  }

  /**
   * @method addEventListener
   * Registers a callback function to be called when the specified event is emitted.
   *
   * @param {string} eventName - The name of the event to listen for.
   * @param {Function} cb - The callback function to be executed when the event is emitted.
   */
  addEventListener(eventName, cb) {
    if (!this.eventsMap.has(eventName)) {
      // If the event doesn't exist, create a new entry with the callback
      this.eventsMap.set(eventName, [cb]);
      return;
    }

    // If the event already exists, add the new callback to the existing array
    const cbs = this.eventsMap.get(eventName);
    cbs.push(cb);
    this.eventsMap.set(eventName, cbs);
  }

  /**
   * @method removeEventListener
   * Removes a specific callback function from the specified event.
   *
   * @param {string} eventName - The name of the event to remove the listener from.
   * @param {Function} cb - The callback function to be removed.
   */
  removeEventListener(eventName, cb) {
    if (!this.eventsMap.has(eventName)) {
      // If the event doesn't exist, there's nothing to remove
      return;
    }

    // Filter out the callback that needs to be removed
    let cbs = this.eventsMap.get(eventName);
    cbs = cbs.filter((currentCb) => currentCb !== cb);
    this.eventsMap.set(eventName, cbs);
  }

  /**
   * @method emitEvent
   * Emits an event, calling all registered callback functions associated with the event.
   *
   * @param {string} eventName - The name of the event to emit.
   * @param {...any} args - Any additional arguments to pass to the callback functions.
   */
  emitEvent(eventName, ...args) {
    if (!this.eventsMap.has(eventName)) {
      // If the event doesn't exist, there's nothing to emit
      return;
    }

    // Get the array of callbacks associated with the event
    let cbs = this.eventsMap.get(eventName);
    cbs.forEach((cb) => {
      // Execute each callback using requestIdleCallback for non-blocking execution
      requestIdleCallback(() => cb(...args));
      // Alternatively, you can use setTimeout to achieve similar behavior
      // setTimeout(() => cb(...args), 0);
    });
  }
}

// Example usage:
const emitter = new EventEmitter();

function greet(message) {
  console.log("Greet:", message);
}

// Add an event listener
emitter.addEventListener("EVENT1", greet);

// Emit the event, triggering the greet callback
emitter.emitEvent("EVENT1", "Hello World!");

// Remove the event listener
emitter.removeEventListener("EVENT1", greet);

// Emit the event again, but the callback won't be triggered as it was removed
emitter.emitEvent("EVENT1", "Hello World!");

// Output:
// Greet: Hello World!
