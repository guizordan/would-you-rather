import { _getQuestions } from "../_DATA";

export const SET_ALL = "questions/SET_ALL";
export const SET_ANSWERED = "questions/SET_ANSWERED";
export const SET_UNANSWERED = "questions/SET_UNANSWERED";

function setAllQuestions(questions) {
  const payload = Object.keys(questions).map(key => questions[key]);
  return {
    type: SET_ALL,
    payload,
  };
}

function setUnansweredQuestions(questions, authedUser) {
  return (dispatch, getState) => {
    const { authedUser, questions } = getState();

    const payload = questions.all.filter(
      question =>
        !authedUser.questions.some(
          userQuestion => userQuestion === question.id,
        ),
    );

    dispatch({ type: SET_UNANSWERED, payload });
  };
}

function setAnsweredQuestions() {
  return (dispatch, getState) => {
    const { authedUser, questions } = getState();

    const payload = questions.all.filter(question =>
      authedUser.questions.some(userQuestion => userQuestion === question.id),
    );

    dispatch({ type: SET_ANSWERED, payload });
  };
}

export function handleGetQuestions(payload) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    _getQuestions().then(questions => {
      dispatch(setAllQuestions(questions));
      if (authedUser) {
        dispatch(setAnsweredQuestions());
        dispatch(setUnansweredQuestions(questions, authedUser));
      }
    });
  };
}
