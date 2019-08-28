import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTransactionsByDate } from "../../actions/index";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as moment from "moment"
import Spinner from "../layout/Spinner"
import Moment from "react-moment"
import { getChartInfo } from "../../actions/index"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      margin : theme.spacing(1,1),
      flex : 1
    },
    paperContainer: {
        display : "flex",
        justifyContent : "space-between"
    },
    redBalance: { 
        color: "#b30909",
        fontWeight : "bold"
    },
    greenBalance : {
        color : "green",
        fontWeight : "bold"
    }
}));


function Chart({ fromDate, toDate, loading, getChartInfo ,chartInfo }) {

    useEffect(() => {
        getChartInfo(fromDate, toDate)
    }, [fromDate, toDate])

    const classes = useStyles();
    return (
        
        !loading && chartInfo?
            <div className={classes.paperContainer}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                       Expense Amount <span className={chartInfo.ExpenseAmount > 0 ? classes.redBalance : classes.greenBalance}>{chartInfo.ExpenseAmount}</span>
                    </Typography>

                    <canvas id="expense" width="400" height="400"></canvas>
                </Paper>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                       Total Balance <span className={chartInfo.TotalBalance < 0 ? classes.redBalance : classes.greenBalance}>{chartInfo.TotalBalance}</span>
                    </Typography>
                </Paper>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                       Income Amount <span className={chartInfo.IncomeAmount <= 0 ? classes.redBalance : classes.greenBalance}>{chartInfo.IncomeAmount}</span>
                    </Typography>
                </Paper>
            </div>
            : <Spinner />
    )
}

Chart.propTypes = {
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    toDate: state.transactions.toDate,
    fromDate: state.transactions.fromDate,
    loading: state.transactions.charts.loading,
    chartInfo: state.transactions.charts.chartData
})

export default connect(mapStateToProps, { getChartInfo })(Chart)

