import Board from './board.js'
import { King, Pawn, Rook } from './figures.js'
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
        var res = []

        var filtered = this.board.map.flat().filter(figure => figure != null)

        if (color) {
            filtered = filtered.filter(figure => figure.getColor() == color)
        }

        filtered.forEach(figure => {
            res.push(this.getMovesFor(figure))
        })

        this.screen.showMoves(res)
    }

    /**
     * Совершить ход фигурой
     */
    makeMove(figure, x, y) {
        var target = this.board.getFigure(x, y)
        // Забираю если есть что
        if (target && target.getColor() != figure.getColor()) {
            this.eatedBy[figure.getColor()].push(target)
        }

        // Проверяю рокировку
        if (figure.constructor == King && target && target.constructor == Rook && !figure.beenMoved && !target.beenMoved) {
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
        } else if (figure.constructor == Pawn) {
            // Проверяю взятие на проходе
            // Здесь доска не перевернута для черных
            var ycoord = 0
            if (figure.getColor() == 'white') {
                ycoord = 1
            } else {
                ycoord = -1
            }

            var target = this.board.getFigure(x, y + ycoord)
            if (target && target.constructor == Pawn && target.getColor() != figure.getColor() && target.longMove) {
                this.board.setFigure(x, y + ycoord, false)
                this.board.setFigure(x, y, figure)
                this.eatedBy[figure.getColor()].push(target)
            }

            this.board.setFigure(x, y, figure)

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
            const enemyMoves = this.board.getAllMoves(figure.getColor() == 'white' ? 'black' : 'white').flat()/*.map(id => {
                const point = idToXy(id)
                return xyToId(7 - point.x, 7 - point.y)
            })*/
            
            moves = moves.filter(i => {
                // Для реализации рокировки захардкодил положения ладьи
                // Т.к. в моей реализации поиска считается что этот ход поставит короля под мат из за особенности отображения возможных ходов
                var coord = idToXy(i)
                if (i == 56 || i == 63) {
                    // Проверяю что здесь союзная ладья
                    var target = this.board.getFigure(coord.x, coord.y)
                    if (target && target.constructor == Rook && figure.getColor() == target.getColor()) {
                        return true
                    }
                }

                return enemyMoves.indexOf(i) < 0
            })

            // Костыль для поиска пешек
            for (var i = -2; i < 3; i++) {
                for (var j = -2; j < 4; j++) {
                    var target = this.board.getFigure(figure.x + i, figure.y - j)

                    if (target && target.constructor == Pawn && target.getColor() != figure.getColor()) {
                        if(figure.y - target.y <= 0 && Math.abs(figure.x - target.x) <= 1) {
                            moves.push(xyToId(figure.x + i, figure.y - j - 1))
                        }

                        var i1 = moves.indexOf(xyToId(figure.x + i - 1, figure.y - j + 1))
                        if (i1 >= 0) {
                            moves.splice(i1, 1)
                        }
                        var i2 = moves.indexOf(xyToId(figure.x + i + 1, figure.y - j + 1))
                        if (i2 >= 0) {
                            moves.splice(i2, 1)
                        }
                    }
                }
            }
        }

        if (figure.getColor() == 'black') {
            // переворачиваю обратно)
            this.board.rotateBoard()

            // переворачиваю полученные элементы массива
            moves = moves.map(id => {
                const point = idToXy(id)
                return xyToId(7 - point.x, 7 - point.y)
            })
        }

        return moves
    }

    getHistory() {

    }
}