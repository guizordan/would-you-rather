import { SET_AUTHED_USER } from "../actions/authedUser";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case SET_AUTHED_USER:
      console.log(payload);
      return payload;
    default:
      return state;
  }
}
