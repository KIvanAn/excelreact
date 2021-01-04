import React from 'react'
import Resizer from './Resizer'
import {connect} from 'react-redux'
import {getWidth} from '../functions/utils'

function TableColumn({col, index, width}) {
    return (
        <div
            className="column"
            data-col={index}
            data-type="resizable"
            style={getWidth(width, index)}
        >
            {col}
            <Resizer classname="col-resize" resize="col" />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        width: state.colState
    }
}

export default connect(mapStateToProps)(TableColumn)
