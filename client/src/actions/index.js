import {
    ADD_TRANSACTION_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,
    SET_FROM_DATE, SET_TO_DATE,
    GET_CHART_INFO_SUCCESS,
    GET_CHART_INFO_FAIL,
    ADD_TRANSACTION_FAIL,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken"

export const loadUser = () => {
    return async dispatch => {

        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get("/api/auth");
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

export const registerUser = (formData) => {
    return async dispatch => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        formData = JSON.stringify(formData);

        try {
            await axios.post("/api/users", formData, config);

            dispatch({
                type: REGISTER_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

export const login = (formData) => {
    return async dispatch => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        formData = JSON.stringify(formData);

        try {
            const res = await axios.post("/api/auth", formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(loadUser());

        } catch (error) {
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        })
    }
}

export const getAllTransactions = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/transactions/getAllTransactions");
            console.log(res);
        } catch (error) {
            dispatch({
                type: GET_TRANSACTIONS_FAIL
            })
        }
    }
}

export const getAllTransactionsByDate = (from, to) => {
    return async dispatch => {

        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        let body = {
            from,
            to
        }
        try {
            const res = await axios.post("/api/transactions/getAllTransactionsByDate", body, config);

            dispatch({
                type: GET_TRANSACTIONS_SUCCESS,
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: GET_TRANSACTIONS_FAIL
            })
        }
    }
}

export const setFromDate = (date) => {
    return async dispatch => {
        dispatch({
            type: SET_FROM_DATE,
            payload: date
        })
    }

}

export const setToDate = (date) => {
    return async dispatch => {
        dispatch({
            type: SET_TO_DATE,
            payload: date
        })
    }

}

export const getChartInfo = (from, to) => {
    return async dispatch => {
        try {
            let config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            let body = {
                from,
                to
            }
            const res = await axios.post("/api/transactions/getChartInfoByDate", body, config);
            dispatch({
                type: GET_CHART_INFO_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: GET_CHART_INFO_FAIL
            })
        }
    }
}


export const addTransaction = (formData) => {
    return async dispatch => {
        try {
            let config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.post("/api/transactions/", formData, config);

            dispatch({
                type: ADD_TRANSACTION_SUCCESS,
                payload: res.data
            })
        }
        catch (err) {
            dispatch({
                type: ADD_TRANSACTION_FAIL
            })
        }
    }
}

export const getAllCategories = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/categories/getAllCategories");
            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }
        catch (err) {
            dispatch({
                type: GET_ALL_CATEGORIES_FAIL
            })
        }
    }
}