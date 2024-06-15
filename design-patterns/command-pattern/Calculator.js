export class Calculator {
    constructor() {
        this.currentValue = 0
        this.commands = []
    }

    execute(command) {
        this.currentValue = command.execute(this.currentValue)
        this.commands.push(command)
    }

    undo() {
        let command = this.commands.pop()
        this.currentValue = command.undo(this.currentValue)
    }
}