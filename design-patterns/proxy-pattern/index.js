let user = {
    name: 'Mohit',
    email: 'm@g.com'
}

let userProxy = new Proxy(user, {
    get(target, property) {
        // return target[property]
        return Reflect.get(target, property)
    },
    set(target, property, newValue) {
        // target[property] = newValue
        // return true
        if (property === 'name' && newValue.length < 3) {
            throw new Error('A proper name should be provided')
        }
        return Reflect.set(target, property, newValue)
    }
})

console.log(userProxy.name)
userProxy.name = 'John'
console.log(userProxy.name)
// userProxy.name = 'Sa'
userProxy.name = 'Sam'
console.log(userProxy.name)

