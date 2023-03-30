import { Sprites } from './figures.js'

function xyToId(x, y) {
    return x + (y * 8)
}

function idToXy(id) {
    return {
        x: Math.floor(id / 8),
        y: id % 8
    }
}

export function Cell(x, y, icon = false) {
    return {
        x, y, icon,

        /**
         * Возвращает массив с id тех элементов доски, 
         * на которые может ходить данная фигура.
         */
        getMoves(board) {
            switch (this.icon) {
                case '♙': // пешка белая
                    const moves = []

                    //Пешка может ходить вперёд на свободное поле, расположенное непосредственно перед ней на той же самой вертикали.
                    moves.push(xyToId(this.x, this.y - 1))

                    //С исходной позиции пешка может продвинуться на два поля по той же самой вертикали, если оба эти поля не заняты.
                    if (this.y == 6) {
                        if (!board.getCell(this.x, this.y - 1)) {
                            moves.push(xyToId(this.x, this.y - 1))
                        }

                        if (!board.getCell(this.x, this.y - 2)) {
                            moves.push(xyToId(this.x, this.y - 2))
                        }
                    }

                    //Пешка ходит на поле, занимаемое фигурой или пешкой противника, которая расположена по диагонали на смежной вертикали, одновременно забирая эту фигуру или пешку.
                    if (board.getCell(this.x + 1, this.y - 1) && this.x + 1 < 8) {
                        moves.push(xyToId(this.x + 1, this.y - 1))
                    }
                    if (board.getCell(this.x - 1, this.y - 1) && this.x - 1 >= 0) {
                        moves.push(xyToId(this.x - 1, this.y - 1))
                    }

                    //Пешка, атакующая поле, пересечённое пешкой партнёра, который продвинул её с исходной позиции сразу на два поля, может взять эту продвинутую пешку, как если бы последний её ход был только на одно поле. Это взятие может быть сделано только очередным ходом и называется «взятием на проходе».

                    return moves
                case '♟': // пешка черная


                    if (figure == '♙') {

                    }

                    return []
                default:
                    throw new Error('Неизвестная фигура')
            }
        }
    }
}

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

            this.map[8 + i] = Cell(i, 2, Sprites.black.pawn)
            this.map[i] = Cell(i, 0, Sprites.black[template[i]])

            this.map[48 + i] = Cell(i, 6, Sprites.white.pawn)
            this.map[56 + i] = Cell(i, 6, Sprites.white[template[i]])
        }
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

            if (cell) {
                cellEl.innerHTML = cell.icon
                cellEl.onclick = () => {
                    var moves = cell.getMoves(this)

                    if (cellEl.backgroundColor == 'red') {
                        this.draw(boardEl)
                    } else {
                        cellEl.backgroundColor = 'red'
                        moves.forEach(i => {
                            boardEl.childNodes[i].style.backgroundColor = 'red'
                        })
                    }
                }
            }

            boardEl.append(cellEl)
        })
    }

    getCell(x, y) {
        return this.map[x + (y * 8)]
    }
}