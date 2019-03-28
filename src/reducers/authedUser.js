import { SET_AUTHED_USER, UNSET_AUTHED_USER } from "../actions/authedUser";

export default function(state = null, { type, payload }) {
  switch (type) {
    case SET_AUTHED_USER:
      return payload;
    case UNSET_AUTHED_USER:
      return null;
    default:
      return state;
  }
}
