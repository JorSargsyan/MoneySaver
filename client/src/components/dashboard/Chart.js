import React, { useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner"
import { getChartInfo } from "../../actions/index"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Donut from "../dashboard/Donut"
import AddTransactionDialog from "../transactions/AddTransactionDialog"
import AddCategoryDialog from "../transactions/AddCategoryDialog"
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        flex: 1,
        background: "rgba(63, 81, 181, 0.2784313725490196)"
    },
    paperContainer: {
        marginTop : 15,
        marginBottom : 15,
        display: "grid",
        justifyContent: "space-between",
        width: "100%",
        gridTemplateColumns: "50% 50%",
    },
    redBalance: {
        color: "#b30909",
        fontWeight: "bold"
    },
    greenBalance: {
        color: "green",
        fontWeight: "bold"
    },
    textAlign: {
        textAlign: "center"
    },
    toolbar: {
        display:"flex",
        justifyContent : "flex-start"
    }
}));




function Chart({userLoading,transactions, fromDate, toDate, loading ,getChartInfo, chartInfo ,expenseChartData ,incomeChartData}) {
    const classes = useStyles();
    useEffect(() => {
        if(!userLoading){
            getChartInfo(fromDate, toDate);
        }
    }, [fromDate, toDate ,userLoading,transactions,getChartInfo])

    
    return (
        (!loading && chartInfo) ?
            <Fragment>
                <Paper className={classes.root}>
                    <Typography variant="h5"  component="h3">
                        Total Balance <span className={chartInfo.TotalBalance < 0 ? classes.redBalance : classes.greenBalance}>{chartInfo.TotalBalance} AMD</span>
                    </Typography>
                </Paper>
                <div className={classes.paperContainer}>
                    <Paper className={classes.root}>
                        <Typography variant="h5" className={classes.textAlign} component="h3">
                            Expense Amount <span className={chartInfo.ExpenseAmount > 0 ? classes.redBalance : classes.greenBalance}>{chartInfo.ExpenseAmount} AMD</span>
                        </Typography>
                         <Donut labels={expenseChartData.labels} series={expenseChartData.series} />
                    </Paper>
                    <Paper className={classes.root}>
                        <Typography variant="h5" className={classes.textAlign} component="h3">
                            Income Amount <span className={chartInfo.IncomeAmount <= 0 ? classes.redBalance : classes.greenBalance}>{chartInfo.IncomeAmount} AMD</span>
                        </Typography>
                          <Donut labels={incomeChartData.labels} series={incomeChartData.series} />
                    </Paper>
                </div>
                <div className={classes.toolbar}>
                <AddTransactionDialog />
                <AddCategoryDialog />
                </div>
                
            </Fragment>
            : <Spinner />
    )
}

Chart.propTypes = {
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    userLoading : state.auth.userData.loading,
    toDate: state.transactions.toDate,
    fromDate: state.transactions.fromDate,
    loading: state.transactions.charts.loading,
    transactions : state.transactions.transactions,
    chartInfo: state.transactions.charts.chartData,
    expenseChartData : state.transactions.charts.expenseChartData,
    incomeChartData :state.transactions.charts.incomeChartData
})

export default connect(mapStateToProps, { getChartInfo })(Chart)

