import { push } from "connected-react-router";
import { removeAuthedUser, saveAuthedUser } from "../localStorage";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_AUTHED_USER = "@@authedUser/SET";
export const UNSET_AUTHED_USER = "@@authedUser/UNSET";

function setAuthedUser(payload) {
  return dispatch => {
    dispatch({
      type: SET_AUTHED_USER,
      payload,
    });
    dispatch(hideLoading());
  };
}

function unsetAuthedUser() {
  return dispatch => {
    dispatch({
      type: UNSET_AUTHED_USER,
    });
    dispatch(hideLoading());
  };
}

export function handleSetAuthedUser(authedUser, referrer = "/") {
  return (dispatch, getState) => {
    dispatch(showLoading());
    saveAuthedUser(authedUser);
    dispatch(setAuthedUser(authedUser));
    dispatch(push(referrer));
  };
}

export function handleUnsetAuthedUser() {
  return dispatch => {
    dispatch(showLoading());
    removeAuthedUser();
    dispatch(unsetAuthedUser());
  };
}
