import { _getUsers } from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";
export const SET_USERS = "users/SET";

function setUsers(payload) {
  return {
    type: SET_USERS,
    payload,
  };
}

export function handleGetUsers() {
  return disptach => {
    disptach(showLoading());

    return _getUsers()
      .then(res => {
        const users = Object.values(res);
        disptach(setUsers(users));
      })
      .finally(() => disptach(hideLoading()));
  };
}
