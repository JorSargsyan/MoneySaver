import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTransactionsByDate } from "../../actions/index";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import Header from "../dashboard/Header"
import DatePickerTab from "../dashboard/DatePickerTab"
import Spinner from "../layout/Spinner"
import Moment from "react-moment"


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        background: "#3f51b5",
        color: "white",
    },
    datePickerCustom : {
        marginRight:15,
    }
}));


function TransactionsList({ getAllTransactionsByDate, transactions, loading ,fromDate,toDate }) {

    useEffect(() => {
        getAllTransactionsByDate(fromDate, toDate);
    }, [fromDate, toDate])

    const classes = useStyles();

    return (
        <Fragment>
            {!loading ? (
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Transaction Type</TableCell>
                                    <TableCell align="right">Transaction name</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Note</TableCell>
                                    <TableCell align="right" >Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions && transactions.length ? transactions.map(row => {
                                    return (
                                        <TableRow key={row._id}>
                                            <TableCell >{row.transactionType.name}</TableCell>
                                            <TableCell align="right">{row.category.name}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.note}</TableCell>
                                            <TableCell align="right" component="th" scope="row">
                                                <Moment format="YYYY/MM/DD hh:mm:ss">
                                                    {row.date}
                                                </Moment>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) : <TableRow >
                                        <TableCell >Sorry, There are no transactions in that range of time</TableCell>
                                    </TableRow>}
                            </TableBody>
                        </Table>
                    </Paper>
            ) : <Spinner />
            }

        </Fragment>
    )
}

TransactionsList.propTypes = {
    getAllTransactionsByDate: PropTypes.func.isRequired,
    transactions: PropTypes.array,
}

const mapStateToProps = (state) => ({
    transactions: state.transactions.transactions,
    loading: state.transactions.loading,
    fromDate : state.transactions.fromDate,
    toDate : state.transactions.toDate
})

export default connect(mapStateToProps, { getAllTransactionsByDate })(TransactionsList);

