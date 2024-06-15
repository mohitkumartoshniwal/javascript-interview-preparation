// https://blog.bitsrc.io/what-is-an-abstract-syntax-tree-7502b71bde27

// 1 * 2 + 3

import BinaryExpression from "./src/BinaryExpression.mjs"
import NumericLiteral from "./src/NumericLiteral.mjs"
import Visitor from "./src/Visitor.mjs"


const visitor = new Visitor()


const oneLiteral = new NumericLiteral(1)
const twoLiteral = new NumericLiteral(2)
const threeLiteral = new NumericLiteral(3)
// console.log("NumericLiteral", oneLiteral.accept(visitor))


const leftExpression = new BinaryExpression(oneLiteral, '*', twoLiteral)
const mainExpression = new BinaryExpression(leftExpression, '+', threeLiteral)

// const binExpression = new BinaryExpression(oneLiteral, '+', twoLiteral)
// const binExpression2 = new BinaryExpression(oneLiteral, '-', twoLiteral)


// console.log("ADD", binExpression.accept(visitor))
// console.log("SUBTRACT", binExpression2.accept(visitor))
// console.log("MULTIPLY", binExpression3.accept(visitor))

console.log(mainExpression)
console.log(mainExpression.accept(visitor))