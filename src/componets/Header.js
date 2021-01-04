import React from 'react'
import {connect} from 'react-redux'
import {changeTitle} from '../redux/actions'
import {Link} from 'react-router-dom'
import {activePath} from '../functions/utils'

function Header(props) {

    function deleteTable() {
        const question = 'Are you sure, than you delete this table?'
        const decision = window.confirm(question)

        if (decision) {
            localStorage.removeItem('excel:' + activePath())
        }
    }

    return (
        <div className="excel__header">
            <input
                type="text"
                className="input"
                value={props.title}
                onChange={e => props.changeTitle(e.target.value)}
            />
                <div>
                    <Link
                        to="/"
                        className="button"
                        data-button="remove"
                        onClick={() => deleteTable()}
                    >
                        <i className="material-icons" data-button="remove">
                            delete_outline
                        </i>
                    </Link>
                    <Link to="/" className="button" data-button="exit">
                        <i className="material-icons" data-button="exit">
                            exit_to_app
                        </i>
                    </Link>
                </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        title: state.title
    }
}

const mapDispatchToProps = {
    changeTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
