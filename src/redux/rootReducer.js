import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    CHANGE_TITLE,
    TABLE_RESIZE,
    UPDATE_DATE
} from './types'

export const rootReducer = (state, action) => {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.payload.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.payload.value,
                [field]: value(state, field, action)
            }
        case CHANGE_STYLES:
            return {...state, currentStyles: action.payload}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.payload.ids.forEach(id => {
                val[id] = {...val[id], ...action.payload.value}
            });
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.payload.value}
            }
        case CHANGE_TITLE:
            return {...state, title: action.payload}
        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()}
        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.payload.id] = action.payload.value
    return val
}
