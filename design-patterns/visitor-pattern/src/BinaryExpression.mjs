export default class BinaryExpression {
    constructor(left, operator, right) {
        this.left = left
        this.operator = operator
        this.right = right
    }

    accept(visitor) {
        return visitor.visitBinaryExpression(this)
    }
}