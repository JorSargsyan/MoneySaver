import {combineReducers} from "redux";
import auth from "./auth";
import transactions from "./transactions"
import categories from "./categories"

export default combineReducers({
    auth,transactions,categories
})
