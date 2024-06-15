let instance;

class DBConnection {

    constructor(uri) {
        if (instance) {
            throw new Error('One instance is already present')
        }
        instance = this
        this.uri = uri
    }

    connect() {
        console.log(`${this.uri} connected`)
    }
    disconnect() {
        console.log(`${this.uri} disconnected`)
    }
}

let dbConnection = Object.freeze(new DBConnection('some uri'))
// let dbConnection = new DBConnection('some uri')

export default dbConnection