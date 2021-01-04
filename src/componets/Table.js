import React from 'react'
import {createRows} from '../functions/createRows'
import {applyStyle, changeStyles, changeText, tableResize} from '../redux/actions'
import {connect} from 'react-redux'
import {resizing} from '../functions/resizing'
import {matrix, nextSelector, parse} from '../functions/utils'
import {TableSelection} from '../functions/TableSelection'
import {$} from '../functions/Jquery'
import {defaultStyles} from '../redux/initialState'

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.selection = new TableSelection()
    }

    componentDidMount() {
        this.selectCell($('[data-id="1:0"]'))

        this.props.observer.subscribe('formula:input', value => {
            this.selection.current.attr('data-value', value).text(parse(value))
            this.props.changeText({
                id: this.selection.current.id(),
                value: this.selection.current.text()
            })
        })

        this.props.observer.subscribe('formula:keydown', () => {
            this.selection.current.focus()
        })

        this.props.observer.subscribe('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.props.applyStyle({
                value,
                ids: this.selection.selectedIds
            })
        })
    }

    async resizeTable(event, root, fn) {
        try {
            const data = await resizing(event, root)
            fn(data)
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    selectCell(cell) {
        this.selection.select(cell)
        this.props.observer.emit('table:select', cell)

        const styles = cell.getStyles(Object.keys(defaultStyles))
        this.props.changeStyles(styles)
    }

    mouseDownHandler(e) {
        if (e.target.dataset.resize) {
            this.resizeTable(e, e.currentTarget, this.props.tableResize)
        } else if (e.target.dataset.type === 'cell') {
            const target = $(e.target)
            if (e.shiftKey) {
                const cells = matrix(target, this.selection.current)
                    .map(id => {
                        return $(`[data-id="${id}"]`)
                    })
                this.selection.selectGroup(cells)
            } else {
                this.selectCell(target)
            }
        }
    }

    onInputHandler() {
        this.props.changeText({
            id: this.selection.current.id(),
            value: this.selection.current.text()
        })
        this.props.observer.emit('cell:input', this.selection.current.text())
    }

    onKeydownHandler(event) {
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
            const id = this.selection.current.id(true)
            const next = $(nextSelector(key, id))
            this.selectCell(next)
        }
    }

    render() {
        return (
            <div
                className="excel__table"
                onMouseDown={(e) => this.mouseDownHandler(e)}
                onInput={() => this.onInputHandler()}
                onKeyDown={e => this.onKeydownHandler(e)}
            >
                {createRows(20)}
            </div>
        )
    }
}

const mapDispatchToProps = {
    tableResize,
    changeText,
    applyStyle,
    changeStyles
}

export default connect(null, mapDispatchToProps)(Table)
