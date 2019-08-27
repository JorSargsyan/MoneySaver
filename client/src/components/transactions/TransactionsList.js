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
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from "react-redux";
import * as moment from "moment"
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
    }
}));


function TransactionsList({ getAllTransactionsByDate, transactions,loading}) {

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    useEffect(() => {
        setFromDate(moment().subtract(3, "months").format("YYYY/MM/DD"));
        setToDate(moment().add(1, "days").format("YYYY/MM/DD"))
        if (fromDate && toDate) {
            getAllTransactionsByDate(fromDate, toDate);
        }

    }, [fromDate, toDate]);


    const classes = useStyles();

    return (
        <Fragment>
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
                        {!loading ? transactions.map(row => {
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
                        }) : <Spinner/>}
                    </TableBody>
                </Table>
            </Paper>
            <Tooltip title="Add" aria-label="add">
                <Fab className={classes.absolute}>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Fragment>
    )
}

TransactionsList.propTypes = {
    getAllTransactionsByDate: PropTypes.func.isRequired,
    transactions : PropTypes.array,
}

const mapStateToProps = (state) => ({
    transactions: state.transactions.transactions,
    loading : state.transactions.loading
})

export default connect(mapStateToProps, { getAllTransactionsByDate })(TransactionsList);

