import {
    CHANGE_TEXT,
    TABLE_RESIZE,
    CHANGE_STYLES,
    APPLY_STYLE,
    CHANGE_TITLE,
    UPDATE_DATE
} from './types'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        payload: data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        payload: data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        payload: data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        payload: data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        payload: data
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE
    }
}
