import React, {useEffect} from 'react'
import {$} from '../functions/Jquery'

function Formula(props) {
    useEffect(() => {
        const input = $('[data-input="input"]')

        props.observer.subscribe('table:select', cell => {
            input.text(cell.data.value)
        })

        props.observer.subscribe('cell:input', text => input.text(text))
    })

    function onInputHandler(event) {
        props.observer.emit('formula:input', $(event.target).text())
    }

    function onKeyDownHandler(event) {
        const keys = ['Enter', 'Tab']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            props.observer.emit('formula:keydown')
        }
    }

    return (
        <div className="excel__formula">
            <div className="info">fx</div>
            <div
                className="input"
                contentEditable="true"
                suppressContentEditableWarning={true}
                spellCheck="false"
                data-input="input"
                onInput={e => onInputHandler(e)}
                onKeyDown={e => onKeyDownHandler(e)}
            >
            </div>
        </div>
    )
}

export default Formula
