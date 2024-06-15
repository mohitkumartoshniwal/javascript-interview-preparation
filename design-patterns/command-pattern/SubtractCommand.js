export class SubtractCommand {
    constructor(amount) {
        this.amount = amount
    }

    execute(value) {
        return value - this.amount
    }

    undo(value) {
        return value + this.amount
    }
}