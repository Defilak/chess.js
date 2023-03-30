import { Sprites } from './figures.js'

//const Board = Array(64)

export class Board {
    map = Array(64)

    constructor() {
        this.map.fill(null)
    }

    /**
     * Добавляет на доску фигуры на стартовых позициях
     */
    fillStartingPositions() {
        const template = ['rook', 'horse', 'bishop', 'queen', 'king', 'bishop', 'horse', 'rook'];

        for (var i = 0; i < 8; i++) {
            this.map[1 * 8 + i] = Sprites.white.pawn
            this.map[6 * 8 + i] = Sprites.black.pawn

            this.map[i] = Sprites.white[template[i]]
            this.map[7 * 8 + i] = Sprites.black[template[i]]
        }

        console.log(this.map)
    }

    /**
     * Рендерю в указанный элемент шахматные фигуры.
     * @param {*} boardEl - DOM елемент для заполнения
     */
    draw(boardEl) {
        boardEl.innerHTML = ''

        this.map.forEach((cell, i) => {
            const cellEl = document.createElement('div')
            const x = Math.floor(i / 8)
            const y = i % 8
            cellEl.className = 'cell ' + ((x % 2 == y % 2) ? 'white' : 'black')

            if (cellEl) {
                cellEl.innerHTML = cell
            }

            boardEl.append(cellEl)
        })
    }

    getCell(x, y) {
        return this.map[x * 8 + y]
    }
}