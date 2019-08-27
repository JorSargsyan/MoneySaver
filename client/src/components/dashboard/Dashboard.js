import React from 'react'
import Header from "./Header"
import TransactionList from "../transactions/TransactionsList"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute"

export default function Dashboard() {
    return (
        <div>
            <Header />
            <h1>This is Dashboard</h1>
            <Router>
                <Switch>
                    <PrivateRoute path="/transactions" component={TransactionList}></PrivateRoute>
                </Switch>
            </Router> 
        </div>
    )
}
