let observers = []

let Observable = {
    addObserver: (observer) => {
        observers.push(observer)
    },

    removeObserver: (observer) => {
        observers.forEach((ob, i) => {
            if (observer === ob) {
                observers.splice(i, 1)
            }
        })
    },

    notifyObservers: (data) => {
        observers.forEach((observer) => observer(data))
    }
}

export default Observable