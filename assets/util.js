

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
    if (0 < x < 8 && 0 < y < 8) {
        cb(x, y)
    }
}

/**
 * Добавляет координаты в массив если они в рамках доски
 */
export function addMove(x, y, arr) {
    if (0 <= x && x < 8 && 0 <= y && y < 8) {
        arr.push(xyToId(x, y))
    }
}

/**
 * Переворачивает матрицу (доску) на 180 градусов
 */
export function rotateMatrix(matrix) {
    var result = [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]

    var y = 0
    for (var i = matrix.length - 1; i >= 0; i--) {
        var x = 0
        for (var j = matrix[i].length - 1; j >= 0; j--) {
            result[y][x] = matrix[i][j]
            x++
        }
        y++
    }

    return result
}