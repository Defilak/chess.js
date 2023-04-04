import { Pawn, Rook, Horse, Bishop, Queen, King } from './figures.js'

export default class Board {

    // Это матрица стола
    map = [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]

    constructor() {
        this.map.forEach((arr, y) => arr.fill(null))
    }

    getCell(x, y) {
        if (y < 0 || y >= this.map.length)
            return false
        if (x < 0 || x >= this.map[y].length)
            return false

        return this.map[y][x]
    }

    setCell(x, y, figureType, color) {
        if(figureType) {
            this.map[y][x] = new figureType(x, y, color)
        }
    }
 
    /**
     * Очищает доску и добавляет фигуры на стартовых позициях
     */
    fillStartingPositions() {
        this.map.forEach((el) => el.fill(null))

        const template = [Rook, Horse, Bishop, Queen, King, Bishop, Horse, Rook];
        for (var x = 0; x < 8; x++) {
            this.setCell(x, 0, template[x], 'black')
            this.setCell(x, 1, Pawn, 'black')

            this.setCell(x, 6, Pawn, 'white')
            this.setCell(x, 7, template[x], 'white')


            //this.setCell(0, 6, Pawn, 'white')
            //this.setCell(0, 7, Rook, 'white')
            //this.setCell(3, 4, Pawn, 'black')
            //this.setCell(1, 5, Pawn, 'black')
            //this.setCell(7, 7, Pawn, 'white')
        }
    }
}