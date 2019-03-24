export const SET_AUTHED_USER = "authedUser/SET";

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
