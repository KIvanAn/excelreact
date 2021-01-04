import React from 'react'
import TableColumn from './TableColumn'
import TableCell from './TableCell'
import Resizer from './Resizer'
import {connect} from 'react-redux'
import {getHeight} from '../functions/utils'

const CODES = {
    A: 65,
    Z: 90
}

const colsCount = CODES.Z - CODES.A + 1
const cols = new Array(colsCount).fill('').map(toChar)

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function TableRow({index, height}) {
    const resizer = index
        ? <Resizer classname="row-resize" resize="row" />
        : ''
    const columns = cols.map((col, i) => {
        return (<TableColumn col={col} key={i} index={i} />)
    })

    const cells = cols.map((cell, i) => <TableCell key={i} col={i} row={index} />)

    return (
        <div
            className="row"
            data-type="resizable"
            data-row={index}
            style={getHeight(height, index)}
        >
            <div className="row-info">
                {index ? index : ''}
                {resizer}
            </div>
            <div className="row-data">
                {!index ? columns : cells}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        height: state.rowState
    }
}

export default connect(mapStateToProps)(TableRow)
