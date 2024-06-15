// import { get, increment } from "./script1-es.js";


// console.log(get())
// console.log(increment())
// console.log(get())

import MODULE_NAMESPACE from './script1-es.js'

console.log(MODULE_NAMESPACE.get())
console.log(MODULE_NAMESPACE.increment())
console.log(MODULE_NAMESPACE.get())
