import React from 'react'

function Resizer(props) {
    return (
        <div className={props.classname} data-resize={props.resize}></div>
    )
}

export default Resizer
