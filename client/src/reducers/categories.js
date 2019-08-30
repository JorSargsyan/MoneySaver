import {GET_ALL_CATEGORIES_SUCCESS,GET_ALL_CATEGORIES_FAIL} from "../actions/types";

const initialState = {
    loading : true,
    categories : null
}


export default function (state = initialState,{type,payload}){
    switch(type){
        case GET_ALL_CATEGORIES_SUCCESS:{
            return {
                ...state,
                categories : payload,
                loading : false
            }
        }
        case GET_ALL_CATEGORIES_SUCCESS:{
            return {
                ...state,
                loading : false
            }
        }
        default:
            return state;
    }
}