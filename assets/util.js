

export function xyToId(x, y) {
    return x + (y * 8)
}

export function idToXy(id) {
    return {
        x: id % 8,
        y: Math.floor(id / 8)
    }
}

/**
 * Выполняет функцию если 2 координаты находятся в рамках доски 
 */
export function ifInBoard(x, y, cb) {
    if(0 < x < 8 && 0 < y < 8) {
        cb(x, y)
    }
}

/**
 * Добавляет координаты в массив если они в рамках доски
 */
export function addMove(x, y, arr) {
    if(0 <= x && x < 8 && 0 <= y && y < 8) {
        arr.push(xyToId(x, y))
    }
}

/**
 * Переворачивает и смещает матрицу 8x8
 */
export function rotateMatrix(matrix) {
    let result = Array(arr.length)

    for(var y = 0; y < 8; y++) {
        for(var x = 0; y < 8;y++) {

        }
    }
}