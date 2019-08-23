import React, { useEffect, Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import {getAllTransactionsByDate} from "../../actions/index";
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
import {connect} from "react-redux";
import * as moment from "moment"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    absolute :{
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        background: "#3f51b5",
        color: "white",
    }
}));


function TransactionsList({ getAllTransactionsByDate, allTransactions }) {

    const [fromDate,setFromDate] = useState("")

    const [toDate,setToDate] = useState("")

    useEffect(() => {
        if(!fromDate && !toDate){
            setFromDate(moment());
            setToDate(moment().subtract(3,"months"))
            
        }
        getAllTransactionsByDate(fromDate,toDate);
    },[]);



    const classes = useStyles();

    return (
        <Fragment>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allTransactions && allTransactions.map(row => (
                            <TableRow key={row.name}>
                                {/* <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
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
}

const mapStateToProps = (state) => ({
    allTransactions: state.transactions.transactionsList,
})

export default connect(mapStateToProps,{getAllTransactionsByDate})(TransactionsList);

