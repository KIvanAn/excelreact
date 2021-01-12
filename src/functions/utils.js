import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '../constants'
import {Parser} from 'expr-eval'

export function storageName(param) {
    return 'excel:' + param
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function getWidth(state, index) {
    return {width: (state[index] || DEFAULT_WIDTH) + 'px'}
}

export function getHeight(state, index) {
    return {height: (state[index] || DEFAULT_HEIGHT) + 'px'}
}

function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {col, row}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < 1 ? 1 : row - 1
            break
        default: return key
    }

    return `[data-id="${row}:${col}"]`
}

export function parse(value = '') {
    if (value.startsWith('=')) {
        try {
            const parser = new Parser()
            const expr = parser.parse(value.slice(1))
            return expr.evaluate()
        } catch (e) {
            return value
        }
    }
    return value
}

export function activePath() {
    const pathName = window.location.pathname.slice(1).split('/')[1]
    const param = pathName ? pathName : Date.now().toString()
    return param
}
