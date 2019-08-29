import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from "react-moment"


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },

}));

function TableComponent({transactions,headersList}) {


    const classes = useStyles();

    return (<Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {
                                         headersList.map((item)=>{
                                            return <TableCell key={item.title} align="right">{item.title}</TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions && transactions.length ? transactions.map(row => {
                                    return (
                                        <TableRow key={row._id}>
                                            <TableCell align="right">{row.transactionType.name}</TableCell>
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
    )
}

TableComponent.propTypes = {
    transactions: PropTypes.array,
}

export default TableComponent

