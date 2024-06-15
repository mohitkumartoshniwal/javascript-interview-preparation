export class StrategyManager {
    setStrategy(strategy) {
        this.strategy = strategy
    }

    performAction() {
        this.strategy.performAction()
    }
}