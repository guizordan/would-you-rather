import { _getQuestions } from "../_DATA";

export const SET = "questions/SET";

function setQuestions(payload) {
  return {
    type: SET,
    payload,
  };
}

export function handleGetQuestions(payload) {
  return (dispatch, getState) => {
    _getQuestions().then(questions => {
      dispatch(setQuestions(questions));
    });
  };
}
