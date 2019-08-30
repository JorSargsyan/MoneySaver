import React from 'react'
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from "@material-ui/core/Button"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from "react-redux";
import * as moment from "moment"
import { setToDate, setFromDate } from "../../actions/index"

const useStyles = makeStyles(theme => ({
    datePickerCustom: {
        marginRight: 15,
    },
    btn: {
        marginRight: 15,
        width:150,
        height : 50
    }
}));

function DatePickerTab({ setToDate, setFromDate, fromDate, toDate }) {
    const handleChangeFromDate = (date) => {
        setFromDate(moment(date).format("YYYY/MM/DD"));
    }

    const handleChangeToDate = (date) => {
        setToDate(moment(date).add(1, "days").format("YYYY/MM/DD"));
    }

    const handleChangeBothDates = (type)=>{
        switch(type){
            case "day" : 
                setToDate(moment().add(1, "days").format("YYYY/MM/DD"));
                setFromDate(moment().subtract("1","days").format("YYYY/MM/DD"));
                break;
            
            case "week" : 
                setToDate(moment().add(1, "days").format("YYYY/MM/DD"));
                setFromDate(moment().subtract(7,"days").format("YYYY/MM/DD"));
                break;
            
            case "month" : 
                setToDate(moment().add(1, "days").format("YYYY/MM/DD"));
                setFromDate(moment().subtract(1,"month").format("YYYY/MM/DD"));
                break;
            default : 
                break;
        }
    }

    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between" alignItems="center">
                <Button 
                variant="outlined"
                 color="primary"
                  className={classes.btn}
                  onClick={()=>handleChangeBothDates("day")} >
                    Day
                </Button>
                <Button variant="outlined" color="primary" className={classes.btn}
                 onClick={()=>handleChangeBothDates("week")} > 
                    Week
                </Button>
                <Button variant="outlined" color="primary" className={classes.btn}
                 onClick={()=>handleChangeBothDates("month")} > 
                    Month
                </Button>
                <KeyboardDatePicker
                    margin="normal"
                    className={classes.datePickerCustom}
                    id="date-picker-dialog"
                    label="Select From Date"
                    format="yyyy/MM/dd"
                    animateYearScrolling
                    disableFuture
                    value={fromDate}
                    onChange={handleChangeFromDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    margin="normal"
                    className={classes.datePickerCustom}
                    id="date-picker-dialog"
                    label="Select To Date"
                    format="yyyy/MM/dd"
                    value={toDate}
                    onChange={handleChangeToDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    )
}

DatePickerTab.propTypes = {

}

const mapStateToProps = (state) => ({
    toDate: state.transactions.toDate,
    fromDate: state.transactions.fromDate
})

export default connect(mapStateToProps, { setToDate, setFromDate })(DatePickerTab);

