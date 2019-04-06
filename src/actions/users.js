import { _getUsers } from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_USERS = "@@users/SET";

export function setUsers(payload) {
  return {
    type: SET_USERS,
    payload,
  };
}

export function handleGetUsers() {
  return dispatch => {
    // dispatch(showLoading());

    return _getUsers().then(users => {
      dispatch(setUsers(users));
    });
    // .finally(() => dispatch(hideLoading()));
  };
}
