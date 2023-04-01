import { Pawn, Rook, Horse, Bishop, Queen, King } from './figures.js'
import { xyToId, idToXy } from './util.js'

const Sprites = {
    white: {
        rook: '♖',
        horse: '♘',
        bishop: '♗',
        queen: '♕',
        king: '♔',
        pawn: '♙',
    },
    black: {
        rook: '♜',
        horse: '♞',
        bishop: '♝',
        queen: '♛',
        king: '♚',
        pawn: '♟',
    }
}

export class Board {

    // Это матрица стола
    map = [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]

    /**
     * Очищает доску и добавляет фигуры на стартовых позициях
     */
    fillStartingPositions() {
        this.map.forEach((el) => el.fill(null))

        const template = [Rook, Horse, Bishop, Queen, King, Bishop, Horse, Rook];
        for (var x = 0; x < 8; x++) {

            this.map[0][x] = new Pawn(x, 0, 'black')
            this.map[1][x] = new template[x](x, 1, 'black')

            this.map[6][x] = new Pawn(x, 0, 'white')
            this.map[7][x] = new template[x](x, 1, 'white')
        }
    }

    getCell(x, y) {
        return this.map[y][x]
    }
}