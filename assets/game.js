import Board from './board.js'
import { King, Rook } from './figures.js'
import Screen from './screen.js'
import { idToXy, xyToId } from './util.js'

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
        //this.showAvailableMoves()
    }

    /**
     * Очередь хода
     */
    getMoveQueue() {
        return this.queue
    }

    /**
     * Показать все доступные ходы
     * @param {*} color если указан, покажет ходы для цвета.
     */
    showAvailableMoves(color = false) {
        this.screen.showMoves(this.board.getAllMoves(color))
    }

    /**
     * Передвинуть фигуру на указанные координаты
     */
    makeMove(figure, x, y) {
        const target = this.board.getFigure(x, y)
        // Забираю если есть что
        if (target && target.getColor() != figure.getColor()) {
            this.eatedBy[figure.getColor()].push(target)
        }

        // Проверяю рокировку
        if (figure.constructor == King && target.constructor == Rook && !figure.beenMoved && !target.beenMoved) {
            var figx = figure.x
            if (figure.x < target.x) {
                // короткая
                this.board.setFigure(figx + 2, figure.y, figure)
                this.board.setFigure(figx + 1, figure.y, target)
            } else {
                // Длинная
                this.board.setFigure(figx - 2, figure.y, figure)
                this.board.setFigure(figx - 1, figure.y, target)
            }
        } else {
            // Перемещаю фигуру
            this.board.setFigure(x, y, figure)
        }

        this.queue = (this.queue == 'white') ? 'black' : 'white'
    }

    /**
     * Возвращает доступные фигуре ходы в зависимости от ее цвета
     */
    getMovesFor(figure) {
        if (figure.getColor() == 'black') {
            // Переворачиваю карту для того чтобы не переписывать вычисления ходов для черных фигур
            this.board.rotateBoard()
        }

        var moves = figure.getMoves(this.board)

        // Если фигура - король, фильтрую невозможные ходы
        if (figure.constructor == King) {
            const enemyMoves = this.board.getAllMoves(figure.getColor() == 'white' ? 'black' : 'white').flat()
            moves = moves.filter(i => {
                // Для реализации рокировки захардкодил положения ладьи
                // Т.к. считается что этот ход поставит короля под мат из за особенности отображения возможных ходов
                if (i == 56 || i == 63) {
                    // Проверяю что здесь союзная ладья
                    var coord = idToXy(i)
                    var target = this.board.getFigure(coord.x, coord.y)
                    if (target && target.constructor == Rook && figure.getColor() == target.getColor()) {
                        console.log(target)
                        return true
                    }
                }

                return enemyMoves.indexOf(i) < 0
            })
        }

        if (figure.getColor() == 'black') {
            // переворачиваю обратно)
            this.board.rotateBoard()

            // переворачиваю полученные элементы массива
            return moves.map(id => {
                const point = idToXy(id)
                return xyToId(7 - point.x, 7 - point.y)
            })
        }

        return moves
    }

    getHistory() {

    }
}