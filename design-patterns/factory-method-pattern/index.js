import { createUser } from "./Factory.js";

let user1 = createUser({ name: 'Mohit', email: 'm@g.com', role: 'NORMAL' })
console.log({ user1 })

let user2 = createUser({ name: 'John', email: 'j@g.com', role: 'ADMIN' })
console.log({ user2 })