import {
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAIL
} from "../actions/types";

const initialState = {
    loading: true,
    categories: null
}


export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: payload,
                loading: false
            }
        }
        case GET_ALL_CATEGORIES_FAIL : {
            return {
                ...state,
                loading: true,
                categories: null
            }
        }
        case ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading : false,
                categories : payload
            }
        }
        case ADD_CATEGORY_FAIL: {
            return {
                ...state,
                loading:false
            }
        }
        default:
            return state;
    }
}