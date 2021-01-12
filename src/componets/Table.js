import React, {useEffect} from 'react'
import {createRows} from '../functions/createRows'
import {applyStyle, changeStyles, changeText, tableResize} from '../redux/actions'
import {connect} from 'react-redux'
import {resizing} from '../functions/resizing'
import {matrix, nextSelector, parse} from '../functions/utils'
import {TableSelection} from '../functions/TableSelection'
import {$} from '../functions/Jquery'
import {defaultStyles} from '../redux/initialState'

function Table(props) {
    const selection = new TableSelection()

    useEffect(() => {
        selectCell($('[data-id="1:0"]'))

        props.observer.subscribe('formula:input', value => {
            selection.current.attr('data-value', value).text(parse(value))
            props.changeText({
                id: selection.current.id(),
                value: selection.current.text()
            })
        })

        props.observer.subscribe('formula:keydown', () => {
            selection.current.focus()
        })

        props.observer.subscribe('toolbar:applyStyle', value => {
            selection.applyStyle(value)
            props.applyStyle({
                value,
                ids: selection.selectedIds
            })
        })
    })

    async function resizeTable(event, root, fn) {
        try {
            const data = await resizing(event, root)
            fn(data)
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    function selectCell(cell) {
        selection.select(cell)
        props.observer.emit('table:select', cell)

        const styles = cell.getStyles(Object.keys(defaultStyles))
        props.changeStyles(styles)
    }

    function mouseDownHandler(e) {
        if (e.target.dataset.resize) {
            resizeTable(e, e.currentTarget, props.tableResize)
        } else if (e.target.dataset.type === 'cell') {
            const target = $(e.target)
            if (e.shiftKey) {
                const cells = matrix(target, selection.current)
                    .map(id => {
                        return $(`[data-id="${id}"]`)
                    })
                selection.selectGroup(cells)
            } else {
                selectCell(target)
            }
        }
    }

    function onInputHandler() {
        props.changeText({
            id: selection.current.id(),
            value: selection.current.text()
        })
        props.observer.emit('cell:input', selection.current.text())
    }

    function onKeydownHandler(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ]

        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = selection.current.id(true)
            const next = $(nextSelector(key, id))
            selectCell(next)
        }
    }

    return (
        <div
            className="excel__table"
            onMouseDown={(e) => mouseDownHandler(e)}
            onInput={() => onInputHandler()}
            onKeyDown={e => onKeydownHandler(e)}
        >
            {createRows(20)}
        </div>
    )
}

const mapDispatchToProps = {
    tableResize,
    changeText,
    applyStyle,
    changeStyles
}

export default connect(null, mapDispatchToProps)(Table)
