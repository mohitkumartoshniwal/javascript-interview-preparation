// const { get, increment } = require("./script")


// console.log(get())
// console.log(increment())
// console.log(get())


// const MODULE_NAMESPACE = require("./script")

// console.log(MODULE_NAMESPACE.get())
// console.log(MODULE_NAMESPACE.increment())
// console.log(MODULE_NAMESPACE.get())

import { get, increment } from "./script-es.mjs"

console.log(get())
console.log(increment())
console.log(get())