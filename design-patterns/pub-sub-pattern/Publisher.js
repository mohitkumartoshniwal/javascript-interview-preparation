export default class Publisher {
    constructor(broker) {
        this.broker = broker
    }

    publish(event, data) {
        this.broker.publish(event, data)
    }
}