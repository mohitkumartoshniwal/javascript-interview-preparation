export default class NumericLiteral {
    constructor(value) {
        this.value = value
    }

    accept(visitor) {
        return visitor.visitNumericLiteral(this)
    }
}