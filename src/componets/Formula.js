import React from 'react'
import {$} from '../functions/Jquery'

class Formula extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    componentDidMount() {
        this.input = $('[data-input="input"]')

        this.props.observer.subscribe('table:select', cell => {
            this.input.text(cell.data.value)
        })

        this.props.observer.subscribe('cell:input', text => this.input.text(text))
    }

    onInputHandler(event) {
        this.props.observer.emit('formula:input', $(event.target).text())
    }

    onKeyDownHandler(event) {
        const keys = ['Enter', 'Tab']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            this.props.observer.emit('formula:keydown')
        }
    }

    render() {
        return (
            <div className="excel__formula">
                <div className="info">fx</div>
                <div
                    className="input"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    data-input="input"
                    onInput={e => this.onInputHandler(e)}
                    onKeyDown={e => this.onKeyDownHandler(e)}
                >
                </div>
            </div>
        )
    }
}

export default Formula
