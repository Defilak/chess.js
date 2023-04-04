import Board from './board.js'
import Screen from './screen.js'

export default class Game {
    history = []

    eatedBy = {
        white: [],
        black: []
    }

    queue = 'white'

    constructor() {
        this.screen = new Screen(this)
        this.board = new Board()
    }

    start() {
        this.board.fillStartingPositions()
        this.screen.render(this.board)
    }

    /**
     * Очередь хода
     */
    getMoveQueue() {
        return this.queue
    }

    /**
     * Передвинуть фигуру на указанные координаты
     */
    makeMove(figure, x, y) {
        const target = this.board.getFigure(x, y)
        // Забираю если есть что
        if(target && target.getColor() != figure.getColor()) {
            this.eatedBy[figure.getColor()].push(target)
        }

        // Перемещаю фигуру
        this.board.setFigure(x, y, figure)
        this.queue = (this.queue == 'white') ? 'black' : 'white'
    }

    getHistory() {

    }
}