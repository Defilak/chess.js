import {
    Pawn,
    Rook,
    Horse,
    Bishop,
    Queen,
    King
} from './figures.js'
import { idToXy, xyToId } from './util.js'

const Sprites = {
    white: {
        [Rook]: '♖',
        [Horse]: '♘',
        [Bishop]: '♗',
        [Queen]: '♕',
        [King]: '♔',
        [Pawn]: '♙',
    },
    black: {
        [Rook]: '♜',
        [Horse]: '♞',
        [Bishop]: '♝',
        [Queen]: '♛',
        [King]: '♚',
        [Pawn]: '♟',
    }
}

export default class Screen {
    selected = false

    constructor(game) {
        this.game = game
        this.boardEl = document.getElementById('board_el')
        this.queueTextEl = document.getElementById('move_queue_text')
        this.scoreWhite = document.getElementById('score_white')
        this.scoreBlack = document.getElementById('score_black')
    }

    render(board) {
        this.boardEl.innerHTML = ''
        this.drawBoard(board)
        this.drawMoveQueue()
        this.drawScore()

        // Отрисовываю возможные ходы
        if (this.selected) {
            const cellEl = this.boardEl.childNodes[xyToId(this.selected.x, this.selected.y)]
            cellEl.style.backgroundColor = 'red'

            var moves = this.game.getMovesFor(this.selected)
            //var moves = this.selected.getMoves(board)
            moves.forEach(i => {
                if (i < this.boardEl.childNodes.length && i >= 0) {
                    
                    this.boardEl.childNodes[i].style.backgroundColor = 'red'
                    this.boardEl.childNodes[i].onclick = () => {
                        const coords = idToXy(i)
                        this.game.makeMove(this.selected, coords.x, coords.y)

                        this.selected = false
                        this.render(board)
                    }
                }
            })
        }
    }

    showMoves(arr) {
        arr.forEach(figure => {
            figure.forEach(i => {
                this.boardEl.childNodes[i].style.backgroundColor = 'blue'
            })
        })
    }

    drawBoard(board) {
        this.boardEl.innerHTML = ''

        board.map.forEach((arr, y) => {
            arr.forEach((cell, x) => {
                const cellEl = document.createElement('div')
                cellEl.className = 'cell ' + ((x % 2 == y % 2) ? 'white' : 'black')
                //cellEl.innerHTML = xyToId(x, y)
                if (cell) {
                    // Рисую фигуры
                    if (cell.getColor() == 'white') {
                        cellEl.innerHTML = Sprites.white[cell.constructor]
                    } else {
                        cellEl.innerHTML = Sprites.black[cell.constructor]
                    }

                    cellEl.onclick = () => {
                        this.onClickCell(cellEl, cell)
                        this.render(board)
                    }
                }

                this.boardEl.append(cellEl)
            })
        })
    }

    onClickCell(cellEl, cell) {
        // фигура того же цвета что и очередность хода
        const isGoodColor = cell && cell.getColor() == this.game.getMoveQueue()
        //const isGoodColor = true
        if (this.selected === false && isGoodColor) {
            this.selected = cell
        } else {
            this.selected = false
        }
    }

    drawMoveQueue() {
        if (this.game.getMoveQueue() == 'white') {
            this.queueTextEl.innerText = 'Очередь белых'
        } else {
            this.queueTextEl.innerText = 'Очередь черных'
        }
    }

    drawScore() {
        this.scoreWhite.innerHTML = ''
        this.game.eatedBy.white.forEach(figure => {
            const el = document.createElement('div')
            el.className = 'cell'
            el.innerHTML = Sprites.black[figure.constructor]

            this.scoreWhite.append(el)
        })

        this.scoreBlack.innerHTML = ''
        this.game.eatedBy.black.forEach(figure => {
            const el = document.createElement('div')
            el.className = 'cell'
            el.innerHTML = Sprites.white[figure.constructor]

            this.scoreBlack.append(el)
        })
    }
}