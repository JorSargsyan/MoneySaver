import {GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL,SET_TO_DATE,SET_FROM_DATE} from "../actions/types";
import * as moment from "moment"

const initialState = {
    loading : true,
    transactions : null,
    fromDate : moment().subtract(3, "months").format("YYYY/MM/DD"),
    toDate : moment().format("YYYY/MM/DD")
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
        default:
            return state;
    }
}