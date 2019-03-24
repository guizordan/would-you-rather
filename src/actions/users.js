import { _getUsers } from "../_DATA";

export const SET_USERS = "users/SET";

function setUsers(payload) {
  return {
    type: SET_USERS,
    payload,
  };
}

export function handleGetUsers() {
  return disptach => {
    return _getUsers().then(res => {
      const users = Object.values(res);
      disptach(setUsers(users));
    });
  };
}
