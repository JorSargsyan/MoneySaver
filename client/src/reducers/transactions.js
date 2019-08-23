import {GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL} from "../actions/types";

const initialState = {
    loading : true,
    transactions : null
}



export default function (state = initialState,{type,payload}){
    switch(type){
        case GET_TRANSACTIONS_SUCCESS:{
            return {
                ...state,
                transactions : payload,
            }
        }
        case GET_TRANSACTIONS_FAIL : {
            return {
                ...state,
                transactions : null,
            }
        }
        default:
            return state;
    }
}