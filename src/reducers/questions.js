import { SET_ALL, SET_ANSWERED, SET_UNANSWERED } from "../actions/questions";

const initialState = {
  all: [],
  answered: [],
  unanswered: [],
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_ALL:
      return { ...state, all: payload };
    case SET_ANSWERED:
      return { ...state, answered: payload };
    case SET_UNANSWERED:
      return { ...state, unanswered: payload };
    default:
      return state;
  }
}
