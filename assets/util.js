

export function xyToId(x, y) {
    return x + (y * 8)
}

export function idToXy(id) {
    return {
        x: Math.floor(id / 8),
        y: id % 8
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