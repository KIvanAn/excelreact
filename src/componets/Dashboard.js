import React from 'react'
import {Link} from 'react-router-dom'
import {createRecords} from '../functions/createRecords'

function Dashboard() {
    const now = Date.now().toString()

    return (
        <div className="db">
            <div className="db__header">
                <h1>Excel Dashboard</h1>
            </div>
            <div className="db__new">
                <div className="db__view">
                    <Link to={'/excel/' + now} className="db__create">
                        New <br /> table
                    </Link>
                </div>
            </div>
            <div className="db__table db__view">
                {createRecords()}
            </div>
        </div>
    )
}

export default Dashboard
