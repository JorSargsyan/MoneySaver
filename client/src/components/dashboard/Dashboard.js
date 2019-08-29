import React from 'react'
import Header from "./Header"
import Chart from "./Chart"
import DatePickerTab from './DatePickerTab';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute"
import TransactionsList from '../transactions/TransactionsList';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 25,
    },
    paper : {
        padding:theme.spacing(2,3),
        marginBottom : theme.spacing(2),
        background: "rgba(63, 81, 181, 0.2784313725490196)"
    } 
}));


export default function Dashboard({ match }) {
    const classes = useStyles();
    return (
        <div>
            <Header />
            <div className={classes.container}>
                <Paper className={classes.paper}><DatePickerTab /></Paper>
                
                <Switch>
                    <PrivateRoute path={`${match.path}/history`} component={TransactionsList}></PrivateRoute>
                    <PrivateRoute path={`${match.path}`} exact component={Chart}></PrivateRoute>
                </Switch>
            </div>
        </div>
    )
}
