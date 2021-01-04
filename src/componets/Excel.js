import React from 'react'
import Header from './Header'
import Toolbar from './Toolbar'
import Formula from './Formula'
import Table from './Table'
import {Observer} from '../functions/Observer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {rootReducer} from '../redux/rootReducer'
import {normalizeInitialState} from '../redux/initialState'
import {activePath, storage, storageName} from '../functions/utils'
import {updateDate} from '../redux/actions'

class Excel extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.observer = new Observer()
        this.param = activePath()
        this.state = storage(storageName(this.param))
        this.initialState = normalizeInitialState(this.state)
        this.store = createStore(rootReducer, this.initialState)
    }

    componentDidMount() {
        this.store.dispatch(updateDate())

        this.store.subscribe(() => {
            storage(storageName(this.param), this.store.getState())
        })
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className="excel">
                    <Header />
                    <Toolbar observer={this.observer} />
                    <Formula observer={this.observer} />
                    <Table observer={this.observer} />
                </div>
            </Provider>
        )
    }
}

export default Excel
