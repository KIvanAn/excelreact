import React from 'react'
import {Link} from 'react-router-dom'

export function Record({link, name, opened}) {
    return (
        <li className="db__record">
            <Link to={link}>{name}</Link>
            <strong>{opened}</strong>
        </li>
    )
}
