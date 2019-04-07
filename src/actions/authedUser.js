import { push } from "connected-react-router";
import { removeAuthedUser, saveAuthedUser } from "../localStorage";

export const SET_AUTHED_USER = "@@authedUser/SET";
export const UNSET_AUTHED_USER = "@@authedUser/UNSET";

function setAuthedUser(payload) {
  return {
    type: SET_AUTHED_USER,
    payload,
  };
}

function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER,
  };
}

export function handleSetAuthedUser(authedUser, referrer = "/") {
  return (dispatch, getState) => {
    saveAuthedUser(authedUser);
    dispatch(setAuthedUser(authedUser));
    dispatch(push(referrer));
  };
}

export function handleUnsetAuthedUser() {
  return dispatch => {
    removeAuthedUser();
    dispatch(unsetAuthedUser());
  };
}
