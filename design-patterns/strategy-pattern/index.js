import { Strategy1 } from "./Strategy1.js";
import { Strategy2 } from "./Strategy2.js";
import { StrategyManager } from "./StrategyManager.js";

let strategyManager = new StrategyManager()

strategyManager.setStrategy(new Strategy1())
strategyManager.performAction()


strategyManager.setStrategy(new Strategy2())
strategyManager.performAction()