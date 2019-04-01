import { SET } from "../actions/questions";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case SET:
      return { ...state, ...payload };
    default:
      return state;
  }
}
