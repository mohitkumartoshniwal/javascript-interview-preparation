import Observable from "./Observable.js";
import OObservable from "./OObservable.js";

let observable = new Observable();

function observer1(data) {
    console.log(`Observer1: ${data}`)
}

function observer2(data) {
    console.log(`Observer2: ${data}`)
}

observable.addObserver(observer1)
observable.addObserver(observer2)

observable.notifyObservers('New Data')

observable.removeObserver(observer1)

observable.notifyObservers('Observer1 removed')


console.log('\n')

OObservable.addObserver(observer1)
OObservable.addObserver(observer2)

OObservable.notifyObservers('New Data')

OObservable.removeObserver(observer1)

OObservable.notifyObservers('Observer1 removed')
