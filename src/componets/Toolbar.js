import React from 'react'
import {Button} from './Button'
import {connect} from 'react-redux'
import {$} from '../functions/Jquery'

function Toolbar(props) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: props.currentStyles['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: props.currentStyles['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: props.currentStyles['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: props.currentStyles['fontWeight'] === 'bold',
            value: {
                fontWeight: props.currentStyles['fontWeight'] === 'bold' ? 'normal' : 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: props.currentStyles['fontStyle'] === 'italic',
            value: {
                fontStyle: props.currentStyles['fontStyle'] === 'italic' ? 'normal' : 'italic'
            }
        },
        {
            icon: 'format_underlined',
            active: props.currentStyles['textDecoration'] === 'underline',
            value: {
                textDecoration: props.currentStyles['textDecoration'] === 'underline'
                    ? 'none'
                    : 'underline'
            }
        },
    ]

    function onClickHandler(event) {
        const target = $(event.target)
        if (target.data.type === 'button') {
            const value = JSON.parse(target.data.value)
            props.observer.emit('toolbar:applyStyle', value)
        }
    }

    return (
        <div
            className="excel__toolbar"
            onClick={e => onClickHandler(e)}
        >
            {buttons.map((btn, i) => <Button button={btn} key={i} />)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentStyles: state.currentStyles
    }
}

export default connect(mapStateToProps)(Toolbar)
