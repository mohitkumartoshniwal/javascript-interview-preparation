let uri = 'some uri'

let DBConnection = {
    connect: () => {
        console.log(`${uri} connected`)
    },
    disconnect: () => {
        console.log(`${uri} disconnected`)
    }
}

let dbConnection = Object.freeze(DBConnection)

export default dbConnection