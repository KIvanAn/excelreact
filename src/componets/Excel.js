import React, { useEffect } from 'react'
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

function Excel() {
    const observer = new Observer()
    const param = activePath()
    const state = storage(storageName(param))
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState)

    useEffect(() => {
        store.dispatch(updateDate())

        store.subscribe(() => {
            storage(storageName(param), store.getState())
        })
    })

    return (
        <Provider store={store}>
            <div className="excel">
                <Header />
                <Toolbar observer={observer} />
                <Formula observer={observer} />
                <Table observer={observer} />
            </div>
        </Provider>
    )
}

export default Excel
