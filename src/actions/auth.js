import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  GETUSERDATA,
  GETDATA_FAIL,
} from "./types";

import AuthService from "../services/auth.service";

  export const getData = () => (dispatch) => {
    return AuthService.getUserData().then(
      (data) => {
        dispatch({
          type: GETUSERDATA,
          payload: {user: data},
        });
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data

        dispatch({
          type: GETDATA_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data;
        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

  export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
      type: LOGOUT,
    });
  };