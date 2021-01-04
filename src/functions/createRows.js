import React from 'react'
import TableRow from '../componets/TableRow'

export function createRows(rows) {
    const Rows = Array(rows + 1)
        .fill('')
        .map((row, i) => <TableRow key={i} index={i} />)
    return Rows
}
