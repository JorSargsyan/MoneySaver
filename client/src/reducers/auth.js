import { USER_LOADED , AUTH_ERROR , REGISTER_SUCCESS, LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from "../actions/types";

const initialState = {
    isAuthenticated : false,
    isRegistered  :false,
    loading : true,
    user : null
}


export default function (state = initialState,{type,payload}){
    switch(type){
        case USER_LOADED : {
            return  {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : payload,
                isRegistered: false,
            }
        }
        case REGISTER_SUCCESS : {
            return {
                ...state,
                isRegistered: true
            }
        }
        case LOGIN_SUCCESS : {
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                isAuthenticated: true,
                isRegistered : false,
                user : payload
            }
        }
        case LOGOUT:
        case AUTH_ERROR :
        case LOGIN_FAIL:{
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                isRegistered : false,
                loading : false,
                user : null
            }
        }
        default:
            return state;
    }
}