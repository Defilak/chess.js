import Board from './board.js'

export default class Game {
    history = []

    constructor(screen) {
        this.screen = screen
        this.board = new Board()
    }

    start() {
        this.board.fillStartingPositions()
        this.screen.render(this.board)
    }

    /**
     * Сделать ход
     */
    makeMove(player, move) {
        this.screen.render(this.board)
    }

    getHistory() {

    }
}