import {ADD_TRANSACTION_SUCCESS,ADD_TRANSACTION_FAIL,LOGOUT,GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL,SET_TO_DATE,SET_FROM_DATE,GET_CHART_INFO_FAIL,GET_CHART_INFO_SUCCESS} from "../actions/types";
import * as moment from "moment"

const initialState = {
    loading : true,
    transactions : null,
    fromDate : moment().subtract(3, "months").format("YYYY/MM/DD"),
    toDate : moment().add(1,"days").format("YYYY/MM/DD"),
    charts : {
        loading :true,
        chartData : null,
        expenseChartData : null,
        incomeChartData  :null,
    }
}


export default function (state = initialState,{type,payload}){
    switch(type){
        case GET_TRANSACTIONS_SUCCESS:{
            return {
                ...state,
                transactions : payload,
                loading:false,
            }
        }
        case GET_TRANSACTIONS_FAIL : {
            return {
                ...state,
                transactions : null,
                loading:false,
            }
        }
        case SET_FROM_DATE:{
            return {
                ...state,
                fromDate : payload,
                loading:false,
            }
        }
        case SET_TO_DATE:{
            return {
                ...state,
                toDate : payload,
                loading:false,
            }
        }
        case GET_CHART_INFO_SUCCESS:{
            return {
                ...state,
                loading:false,
                charts : {
                    loading:false,
                    chartData : payload,
                    expenseChartData : {
                        labels : payload.expenses.map((item) => {
                            return `${item.category} - ${item.amount}`
                        }),
                        series : payload.expenses.map((item) => {
                            return item.percent
                        }),
                    },
                    incomeChartData : {
                        labels : payload.incomes.map((item) => {
                            return `${item.category} - ${item.amount}`
                        }),
                        series : payload.incomes.map((item) => {
                            return item.percent
                        }),
                    },
                },
            }
        }
        case GET_CHART_INFO_FAIL:{
            return {
                ...state,
                loading:false,
                charts : {
                    loading:false
                }
            }
        }
        case ADD_TRANSACTION_SUCCESS : {
            return {
                ...state,
                transactions : payload,
                loading: false
            }
        }
        case ADD_TRANSACTION_FAIL : {
            return {
                ...state,
                loading : false
            }
        }
        case LOGOUT : {
            return {
                ...state,
                loading : false,
                charts : {
                    loading :false,
                    chartData : null,
                    expenseChartData : null,
                    incomeChartData  :null,
                }
            }
        }
        default:
            return state;
    }
}