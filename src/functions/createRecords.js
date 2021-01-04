import React from 'react'
import {Record} from '../componets/Record'
import {storage} from './utils'

function list(key, i) {
    const link = key.replace(':', '/')
    const model = storage(key)
    const dateOpened = `
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
    `

    return (<Record link={link} name={model.title} opened={dateOpened} key={i} />)
}

export function createRecords() {
    const keys = Object.keys(localStorage)

    if (!keys.length) {
        return (<p>No records</p>)
    }

    return (
        <React.Fragment>
            <div className="db__list-header">
                <span>Name table</span>
                <span>Date open</span>
            </div>
            <ul className="db__list">
                {keys.map(list)}
            </ul>
        </React.Fragment>
    )
}
