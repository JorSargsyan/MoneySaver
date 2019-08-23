import {combineReducers} from "redux";
import auth from "./auth";
import transactions from "./transactions"


export default combineReducers({
    auth,transactions
})
