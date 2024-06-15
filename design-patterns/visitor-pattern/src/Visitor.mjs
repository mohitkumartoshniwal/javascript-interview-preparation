export default class Visitor {

    visitBinaryExpression(binExpr) {
        switch (binExpr.operator) {
            case "+":
                return binExpr.left.accept(this) + binExpr.right.accept(this)
            case "-":
                return binExpr.left.accept(this) - binExpr.right.accept(this)
            case "*":
                return binExpr.left.accept(this) * binExpr.right.accept(this)

        }
    }

    visitNumericLiteral(litExpr) {
        return litExpr.value
    }
}