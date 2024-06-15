// For better encapsulation

class DBConnection {
    constructor(uri) {
        this.uri = uri
    }

    connect() {
        console.log(`DB ${this.uri} has been connected`)
    }


    disconnect() {
        console.log(`DB ${this.uri} has been disconnected`)
    }

    static getInstance(uri) {
        if (!this.instance) {
            this.instance = new DBConnection(uri);
        }
        return this.instance;
    }
}


const singletonDBConnection = DBConnection.getInstance('some uri');
Object.freeze(singletonDBConnection);

export default singletonDBConnection