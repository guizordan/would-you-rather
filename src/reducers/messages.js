import { SAVE_QUESTION_SUCCESS, UNSET_MESSAGES } from "../actions/messages";

const initialState = {
  saveQuestionSuccess: "",
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_QUESTION_SUCCESS:
      return { ...state, saveQuestionSuccess: payload };
    case UNSET_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
