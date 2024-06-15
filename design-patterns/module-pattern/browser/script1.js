// let a = 1;

let MODULE_NAMESPACE = (function iife() {
    let a = 1;

    function get() {
        return a
    }

    function increment() {
        a++
    }

    return {
        get,
        increment
    }
}())