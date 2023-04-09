import { Pawn, Rook, Horse, Bishop, Queen, King } from './figures.js'
import { rotateMatrix } from './util.js'

export default class Board {

    // Это матрица стола
    map = [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]

    constructor() {
        this.map.forEach((arr, y) => arr.fill(null))
    }

    /**
     * Переворачивает доску на 180 градусов
     */
    rotateBoard() {
        this.map = rotateMatrix(this.map)
        this.map.forEach((horisontal, y) => {
            horisontal.forEach((figure, x) => {
                if (figure)
                    figure.move(x, y)
            })
        })
    }

    getFigure(x, y) {
        if (y < 0 || y >= this.map.length)
            return false
        if (x < 0 || x >= this.map[y].length)
            return false

        return this.map[y][x]
    }

    addFigure(x, y, figureType, color) {
        if (figureType) {
            this.map[y][x] = new figureType(x, y, color)
        }
    }

    setFigure(x, y, figure) {
        //todo: дублирование данных
        this.map[figure.y][figure.x] = false
        this.map[y][x] = figure
        figure.move(x, y)
    }

    /**
     * Возвращает все доступные ходы.
     * @param {*} color если передан цвет, возвращает ходы указанного цвета
     */
    getAllMoves(color = false) {
        var result = []

        if (color) {
            this.map.flat()
                .filter(figure => figure && figure.getColor() == color)
                .map(figure => {
                    //result = result.concat(figure.getMoves(this))
                    result.push(figure.getMoves(this))
                })
        } else {
            this.map.flat().filter(figure => figure != null).forEach(figure => {
                result.push(figure.getMoves(this))
            })
        }

        return result
    }

    /**
     * Очищает доску и добавляет фигуры на стартовых позициях
     */
    fillStartingPositions() {
        this.map.forEach((el) => el.fill(null))

        const template = [Rook, Horse, Bishop, Queen, King, Bishop, Horse, Rook];
        for (var x = 0; x < 8; x++) {
            //this.addFigure(x, 0, template[x], 'black')
            //this.addFigure(x, 1, Pawn, 'black')
            //this.addFigure(x, 6, Pawn, 'white')
            //this.addFigure(x, 7, template[x], 'white')

            this.addFigure(1, 5, Bishop, 'black')
            this.addFigure(4, 7, King, 'white')

            //this.setCell(0, 6, Pawn, 'white')
            //this.setCell(0, 7, Rook, 'white')
            //this.setCell(3, 4, Pawn, 'black')
            //this.setCell(1, 5, Pawn, 'black')
            //this.setCell(7, 7, Pawn, 'white')
        }
    }
}