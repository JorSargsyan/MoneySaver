import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTransactionsByDate } from "../../actions/index";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner"
import MaterialTable from "../layout/MaterialTable"
import Moment from "react-moment"


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

    const [data,setData] = useState([]);

    useEffect(() => {
        getAllTransactionsByDate(fromDate, toDate);
      
    }, [fromDate, toDate,getAllTransactionsByDate])


    useEffect(()=>{
        if(transactions != null){
            refactorTransactionsData(transactions);
        }  
    },[transactions])

   
    const refactorTransactionsData = (data)=>{
          let res = data.map((item)=>{
                return {
                    type : item.transactionType.name,
                    category : item.category.name,
                    amount : item.amount,
                    note : item.note,
                    date : <Moment format="DD/MM/YYYY hh:mm:ss" >{item.date}</Moment>
                }
            })
            setData(res); 
     }
    const classes = useStyles();
    return (
        <Fragment>
            {!loading && data ? (
                    <Paper className={classes.root}>
                        <MaterialTable transactions={data}/>
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

