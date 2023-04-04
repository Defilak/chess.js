import {
    Pawn,
    Rook,
    Horse,
    Bishop,
    Queen,
    King
} from './figures.js'
import { xyToId } from './util.js'

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

    constructor(boardEl) {
        this.boardEl = document.getElementById('board_el')
    }

    render(board) {
        this.boardEl.innerHTML = ''

        board.map.forEach((arr, y) => {
            arr.forEach((cell, x) => {
                const cellEl = document.createElement('div')

                cellEl.className = 'cell ' + ((x % 2 == y % 2) ? 'white' : 'black')


                if (cell) {
                    // Рисую фигуры
                    if (cell.getColor() == 'white') {
                        cellEl.innerHTML = Sprites.white[cell.constructor]
                    } else {
                        cellEl.innerHTML = Sprites.black[cell.constructor]
                    }

                    cellEl.onclick = () => {
                        if (this.selected != cell) {
                            this.selected = cell
                        } else {
                            this.selected = false
                        }
                        this.render(board)

                        /*if (cellEl.backgroundColor == 'red') {
                            this.render(board)
                        } else {
                            this.render(board)
                            cellEl.backgroundColor = 'red'

                            var moves = cell.getMoves(board)
                            moves.forEach(i => {
                                this.boardEl.childNodes[i].style.backgroundColor = 'red'
                            })
                        }*/
                    }
                }

                this.boardEl.append(cellEl)
            })
        })

        if (this.selected) {
            const cellEl = this.boardEl.childNodes[xyToId(this.selected.x, this.selected.y)]
            cellEl.style.backgroundColor = 'red'
            var moves = this.selected.getMoves(board)
            moves.forEach(i => {
                if(i < this.boardEl.childNodes.length && i >= 0) {
                    this.boardEl.childNodes[i].style.backgroundColor = 'red'
                }
            })
        }
    }
}