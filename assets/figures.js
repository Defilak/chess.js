import { xyToId, idToXy } from './util.js'

export const WHITE = 'white'
export const BLACK = 'black'

export class Figure {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }

    getColor() {
        return this.color
    }

    getIcon() { }

    move() { }

    /**
     * Возвращает доступные ходы в виде id массива карты.
     */
    getMoves() { }
}

/**
 * Пешка
 */
export class Pawn extends Figure {

    getMoves(board) {
        const moves = []

        //Пешка может ходить вперёд на свободное поле, расположенное непосредственно перед ней на той же самой вертикали.
        //moves.push(xyToId(this.x, this.y - 1))

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
            //moves.push(xyToId(this.x + 1, this.y - 1))
        }
        if (board.getCell(this.x - 1, this.y - 1) && this.x - 1 >= 0) {
            //moves.push(xyToId(this.x - 1, this.y - 1))
        }

        //todo: Пешка, атакующая поле, пересечённое пешкой партнёра, который продвинул её с исходной позиции сразу на два поля, может взять эту продвинутую пешку, как если бы последний её ход был только на одно поле. Это взятие может быть сделано только очередным ходом и называется «взятием на проходе».

        return moves
    }
}

export class Rook extends Figure {

}

export class Horse extends Figure {

}

export class Bishop extends Figure {

}

export class Queen extends Figure {

}

export class King extends Figure {

}

export default {
    Figure, Pawn, Rook, Horse, Bishop, Queen, King
}