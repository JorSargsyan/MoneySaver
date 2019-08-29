import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTransactionsByDate } from "../../actions/index";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import Header from "../dashboard/Header"
import DatePickerTab from "../dashboard/DatePickerTab"
import Spinner from "../layout/Spinner"

import TableComponent from "../layout/TableComponent"


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        background:"rgba(63, 81, 181, 0.2784313725490196)"
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
    const headersList = [
        {
            title : "Transaction Type",
            sortable : false,
        },
        {
            title : "Transaction name",
            sortable : true,
        },
        {
            title : "Amount",
            sortable : false,
        },
        {
            title : "Note",
            sortable : false,
        },
        {
            title : "Date",
            sortable : false,
        }
    ]
    return (
        <Fragment>
            {!loading ? (
                    <Paper className={classes.root}>
                        <TableComponent transactions={transactions} headersList={headersList} />
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

