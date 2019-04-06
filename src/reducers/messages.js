import {
  SAVE_QUESTION_SUCCESS,
  SAVE_QUESTION_ERROR,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SAVE_QUESTION_ANSWER_ERROR,
  UNSET_MESSAGES,
} from "../actions/messages";

const initialState = {
  saveQuestionSuccess: "",
  saveQuestionError: "",
  saveQuestionAnswerSuccess: "",
  saveQuestionAnswerError: "",
};

export default function(state = initialState, { type, message }) {
  switch (type) {
    case SAVE_QUESTION_SUCCESS:
      return { ...state, saveQuestionSuccess: message };
    case SAVE_QUESTION_ERROR:
      return { ...state, saveQuestionError: message };
    case SAVE_QUESTION_ANSWER_SUCCESS:
      return { ...state, saveQuestionAnswerSuccess: message };
    case SAVE_QUESTION_ANSWER_ERROR:
      return { ...state, saveQuestionAnswerError: message };
    case UNSET_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
