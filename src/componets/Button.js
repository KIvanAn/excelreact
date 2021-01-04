import React from 'react'

export function Button (props) {
    const active = props.button.active ? 'active' : ''
    return (
        <div
            className={'button ' + active}
            data-type="button"
            data-value={JSON.stringify(props.button.value)}
        >
            <i
                className="material-icons"
                data-type="button"
                data-value={JSON.stringify(props.button.value)}
            >
                {props.button.icon}
            </i>
        </div>
    )
}
