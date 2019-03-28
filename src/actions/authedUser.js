export const SET_AUTHED_USER = "authedUser/SET";
export const UNSET_AUTHED_USER = "authedUser/UNSET";

function setAuthedUser(payload) {
  return {
    type: SET_AUTHED_USER,
    payload,
  };
}

export function handleSetAuthedUser(payload) {
  return (dispatch, getState) => {
    const { users } = getState();
    const user = users.find(user => user.id === payload);
    dispatch(setAuthedUser(user));
  };
}

export function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER,
  };
}
