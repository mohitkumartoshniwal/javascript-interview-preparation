import { AddCommand } from "./AddCommand.js";
import { Calculator } from "./Calculator.js";
import { SubtractCommand } from "./SubtractCommand.js";


let calculator = new Calculator()

calculator.execute(new AddCommand(3))
console.log(calculator.currentValue)

calculator.execute(new AddCommand(5))
console.log(calculator.currentValue)

calculator.execute(new SubtractCommand(1))
console.log(calculator.currentValue)

calculator.undo()
console.log(calculator.currentValue)

calculator.undo()
console.log(calculator.currentValue)



