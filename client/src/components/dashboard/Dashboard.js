import React from 'react'
import Header from "./Header"
import Chart from "./Chart"
import DatePickerTab from './DatePickerTab';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute"
import TransactionsList from '../transactions/TransactionsList';


const useStyles = makeStyles(theme => ({
    container: {
        padding: 25,
    }
}));

export default function Dashboard({match}) {
    const classes = useStyles();
    return (
        <div>
            <Header />
            <div className={classes.container}>
                <DatePickerTab />
                    <Switch>
                        <PrivateRoute path={`${match.path}/history`} component={TransactionsList}></PrivateRoute>
                        <PrivateRoute  path={`${match.path}/`} exact component={Chart}></PrivateRoute>
                    </Switch>
            </div>
        </div>
    )
}
