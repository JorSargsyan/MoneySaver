import { USER_LOADED , AUTH_ERROR , REGISTER_SUCCESS, LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from "../actions/types";

const initialState = {
    isAuthenticated : false,
    isRegistered  :false,
    loading : true,
    user : null,
    userData:{
        data : null,
        loading:true
    }
}


export default function (state = initialState,{type,payload}){
    switch(type){
        case USER_LOADED : {
            return  {
                ...state,
                isAuthenticated : true,
                loading : false,
                userData : {
                    data : payload,
                    loading : false
                },
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
                user : null,
                userData : {
                    data : null,
                    loading:true
                }
            }
        }
        default:
            return state;
    }
}