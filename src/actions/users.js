import { _getUsers } from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_USERS = "@@users/SET";

export function setUsers(payload) {
  return dispatch => {
    dispatch(hideLoading());

    dispatch({
      type: SET_USERS,
      payload,
    });
  };
}

export function handleGetUsers() {
  return dispatch => {
    dispatch(showLoading());

    _getUsers().then(users => {
      dispatch(setUsers(users));
    });
  };
}
