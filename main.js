import { Pawn, Rook, Horse, Bishop, Queen, King } from './assets/figures.js'

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

import {
    Board
} from './assets/board.js'

//console.log(Sprites.white[Rook])
const board = new Board()
board.fillStartingPositions()

var out = ''
board.map.forEach((xes, y) => {
    if (y != 0)
        out += '\n'
    xes.forEach((figure, x) => {
        if (figure) {
            if (figure.getColor() == 'white') {
                out += Sprites.white[figure.constructor]
            } else {
                out += Sprites.black[figure.constructor]
            }
            //out += figure
        } else {
            out += ' '
        }
    })
})

console.log('---------------------')
console.log(out)
console.log('---------------------')