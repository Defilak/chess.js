import { Pawn, Rook, Horse, Bishop, Queen, King } from './figures.js'

export default class Board {

    // Это матрица стола
    map = [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]

    constructor() {
        this.map.forEach((arr, y) => arr.fill(null))
    }

    getCell(x, y) {
        return this.map[y][x]
    }

    /**
     * Очищает доску и добавляет фигуры на стартовых позициях
     */
    fillStartingPositions() {   
        this.map.forEach((el) => el.fill(null))

        const template = [Rook, Horse, Bishop, Queen, King, Bishop, Horse, Rook];
        for (var x = 0; x < 8; x++) {

            this.map[0][x] = new template[x](x, 0, 'black')
            this.map[1][x] = new Pawn(x, 1, 'black')

            this.map[6][x] = new Pawn(x, 6, 'white')
            this.map[7][x] = new template[x](x, 7, 'white')
        }
    }
}