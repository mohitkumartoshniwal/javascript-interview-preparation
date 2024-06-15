import Broker from "./Broker.js";
import Publisher from "./Publisher.js";

function subscriber1(data) {
    console.log('Subscriber1 ', data)
}

function subscriber2(data) {
    console.log('Subscriber2 ', data)
}

let broker = new Broker()
let publisher = new Publisher(broker)

broker.subscribe('EVENT1', subscriber1)
broker.subscribe('EVENT1', subscriber2)

publisher.publish('EVENT1', 'New Data')

broker.unsubscribe('EVENT1', subscriber1)

publisher.publish('EVENT1', 'Subscriber 1 removed')

