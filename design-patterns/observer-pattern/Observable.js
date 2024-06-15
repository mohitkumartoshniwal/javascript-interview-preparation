export default class Observable {

    constructor() {
        this.observers = []
    }

    addObserver(observer) {
        this.observers.push(observer)
    }

    removeObserver(observer) {
        this.observers.forEach((ob, i) => {
            if (observer === ob) {
                this.observers.splice(i, 1)
            }
        })
    }

    notifyObservers(data) {
        this.observers.forEach((observer) => observer(data))
    }
}