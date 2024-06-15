export default class Broker {
    constructor() {
        this.subscribers = {}
    }

    subscribe(event, fn) {
        if (this.subscribers[event]) {
            this.subscribers[event] = [...this.subscribers[event], fn]
        } else {
            this.subscribers[event] = [fn]
        }
    }

    unsubscribe(event, fn) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter((sub) => sub !== fn)
        }
    }

    publish(event, data) {
        this.subscribers[event].forEach(sub => sub(data));
    }
}