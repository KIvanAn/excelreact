import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './scss/main.scss'
import Excel from './componets/Excel'
import Dashboard from './componets/Dashboard'
import reportWebVitals from './reportWebVitals'

const app = (
    <BrowserRouter>
        <Switch>
            <React.StrictMode>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/excel">
                    <Excel />
                </Route>
            </React.StrictMode>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
