import { xyToId, addMove } from './util.js'

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

    move(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * Возвращает доступные ходы в виде id массива карты.
     */
    getMoves() { }
}

/**
 * Пешка
 */
export class Pawn extends Figure {
    // Флаг, указывающий что пешка была сдвинута на середину поля первым ходом
    //forcedMove = false

    // Для черных переворачиваю доску см. Game.getMovesFor
    getMoves(board) {
        const moves = []

        // Пешка может ходить вперёд на свободное поле, расположенное непосредственно перед ней на той же самой вертикали.
        if(!board.getFigure(this.x, this.y - 1)) {
            addMove(this.x, this.y - 1, moves)
        }

        //С исходной позиции пешка может продвинуться на два поля по той же самой вертикали, если оба эти поля не заняты.
        if (this.y == 6) {
            if (!board.getFigure(this.x, this.y - 2)) {
                addMove(this.x, this.y - 2, moves)
            }
        }

        //Пешка ходит на поле, занимаемое фигурой или пешкой противника, которая расположена по диагонали на смежной вертикали, одновременно забирая эту фигуру или пешку.
        var figure = board.getFigure(this.x + 1, this.y - 1)
        if (figure && figure.getColor() != this.getColor()) {
            addMove(this.x + 1, this.y - 1, moves)
        }
        
        figure = board.getFigure(this.x - 1, this.y - 1)
        if (figure && figure.getColor() != this.getColor()) {
            addMove(this.x - 1, this.y - 1, moves)
        }

        //todo: Пешка, атакующая поле, пересечённое пешкой партнёра, который продвинул её с исходной позиции сразу на два поля, может взять эту продвинутую пешку, как если бы последний её ход был только на одно поле. Это взятие может быть сделано только очередным ходом и называется «взятием на проходе».

        return moves
    }
}

export class Rook extends Figure {
    getMoves(board) {
        const moves = []
        //Ладья может двигаться на любое число полей по горизонтали или по вертикали при условии, что на её пути нет фигур.

        const checkPath = (x, y) => {
            var figure = board.getFigure(x, y)
            if (!figure) {
                addMove(x, y, moves)
                return true
            }

            if (figure.getColor() != this.getColor()) {
                addMove(figure.x, figure.y, moves)
            }

            return false
        }

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x + i, this.y) === false)
                break

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x, this.y + i) === false)
                break

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x - i, this.y) === false)
                break

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x, this.y - i) === false)
                break

        return moves
    }
}

export class Horse extends Figure {
    getMoves(board) {
        const moves = []

        //конь ходит на одно из полей, ближайших к тому, на котором он стоит, но не на той же самой горизонтали, вертикали или диагонали.

        // Добавляет ход только если клетка пустая либо если там нет союзника
        const ifNotFriendly = (x, y, moves) => {
            const figure = board.getFigure(x, y)
            if (!figure || figure.getColor() != this.getColor()) {
                addMove(x, y, moves)
            }
        }

        ifNotFriendly(this.x + 1, this.y + 2, moves)
        ifNotFriendly(this.x - 1, this.y + 2, moves)

        ifNotFriendly(this.x + 1, this.y - 2, moves)
        ifNotFriendly(this.x - 1, this.y - 2, moves)

        ifNotFriendly(this.x - 2, this.y + 1, moves)
        ifNotFriendly(this.x - 2, this.y - 1, moves)

        ifNotFriendly(this.x + 2, this.y + 1, moves)
        ifNotFriendly(this.x + 2, this.y - 1, moves)

        return moves
    }
}

export class Bishop extends Figure {
    getMoves(board) {
        const moves = []
        //Слон может перемещаться на любое число полей по диагонали, при условии, что на его пути нет фигур.

        // Проверяю все диагонали, останавливаюсь если на пути фигура
        // Если это фигура вражеская, захватываю ее в ход и после этого останавливаюсь
        const checkPath = (x, y) => {
            var figure = board.getFigure(x, y)
            if (!figure) {
                addMove(x, y, moves)
                return true
            }

            if (figure.getColor() != this.getColor()) {
                addMove(figure.x, figure.y, moves)
            }

            return false
        }

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x + i, this.y + i) === false)
                break

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x - i, this.y - i) === false)
                break

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x - i, this.y + i) === false)
                break

        for (var i = 1; i < 8; i++)
            if (checkPath(this.x + i, this.y - i) === false)
                break

        return moves
    }
}

export class Queen extends Figure {
    getMoves(board) {
        var moves = []

        //ферзь может перемещаться на любое число свободных полей в любом направлении по прямой, совмещая в себе возможности ладьи и слона.

        //Беру ходы слона и ферзя
        const rook = new Rook(this.x, this.y, this.color)
        moves = moves.concat(rook.getMoves(board))

        const bishop = new Bishop(this.x, this.y, this.color)
        moves = moves.concat(bishop.getMoves(board))

        return moves
    }
}

export class King extends Figure {
    getMoves(board) {
        const moves = []

        // Доступные ходы вражеских фигур
        // Т.к. для черных фигур доска перевернута, ее требуется перевернуть заного
        const enemyMoves = board.getAllMoves(this.getColor() == 'white' ? 'black' : 'white').flat()
        console.log(enemyMoves)

        //Король может перемещаться в любом направлении, но только на 1 поле.
        //Минимальное расстояние между королями обеих сторон всегда должно составлять одно поле, которое ни один из них не имеет права занимать
        for (var y = -1; y < 2; y++) {
            for (var x = -1; x < 2; x++) {
                const figure = board.getFigure(this.x + x, this.y + y)
                if (!figure || figure.getColor() != this.getColor()) {
                    // Проверяю что этот ход не содержится в списке ходов противника
                    if(enemyMoves.indexOf(xyToId(this.x + x, this.y + y)) < 0) {

                        addMove(this.x + x, this.y + y, moves)
                    }
                }
            }
        }

        console.log(moves)

        // Сортирую полученные ходы

        return moves
    }
}

export default {
    Figure, Pawn, Rook, Horse, Bishop, Queen, King
}