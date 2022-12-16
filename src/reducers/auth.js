import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GETUSERDATA,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("userToken"));

const initialState = user
    ? { isLoggedIn: true, user: null }
    : { isLoggedIn: false, user: null };

export default function Auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
            ...state,
            isLoggedIn: true,
            user: payload.user,
            };
        case LOGIN_FAIL:
            return {
            ...state,
            isLoggedIn: false,
            user: null,
            };
        case LOGOUT:
            return {
            ...state,
            isLoggedIn: false,
            user: null,
            };
        case GETUSERDATA:
            return {
                ...state,
                user:payload.user
            }
        default:
            return state;
    }
}
