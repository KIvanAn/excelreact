
export const defaultStyles = {
    textAlign: 'left',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontStyle: 'normal'
}

const defaultState = {
    title: 'New table',
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
}
