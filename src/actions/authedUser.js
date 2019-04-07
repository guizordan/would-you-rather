import { removeAuthedUser } from "../localStorage";

export const SET_AUTHED_USER = "@@authedUser/SET";
export const UNSET_AUTHED_USER = "@@authedUser/UNSET";

function setAuthedUser(payload) {
  return {
    type: SET_AUTHED_USER,
    payload,
  };
}

export function handleSetAuthedUser(key) {
  return (dispatch, getState) => {
    const { users } = getState();
    dispatch(setAuthedUser(users[key].id));
  };
}

function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER,
  };
}

export function handleUnsetAuthedUser() {
  return dispatch => {
    removeAuthedUser();
    dispatch(unsetAuthedUser());
  };
}
