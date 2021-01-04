import React from 'react'
import {connect} from 'react-redux'
import {getWidth, parse} from '../functions/utils'
import {defaultStyles} from '../redux/initialState'

function TableCell({col, row, width, dataState, stylesState}) {
    const id = `${row}:${col}`
    const styles = {...defaultStyles, ...stylesState[id], ...getWidth(width, col)}

    return (
        <div
            className="cell"
            contentEditable="true"
            suppressContentEditableWarning={true}
            data-type="cell"
            data-col={col}
            data-id={id}
            data-value={dataState[id] || ''}
            style={styles}
        >
            {parse(dataState[id]) || ''}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        width: state.colState,
        dataState: state.dataState,
        stylesState: state.stylesState
    }
}

export default connect(mapStateToProps)(TableCell)
