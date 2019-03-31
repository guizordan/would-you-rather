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
  const questionVotes = getAllQuestionVotes(questions);

  let unanswered = [];

  for (const question of questionVotes) {
    const voted = question.votes.some(vote => vote === authedUser.id);
    if (!voted) unanswered = [...unanswered, questions[question.id]];
  }

  return {
    type: SET_UNANSWERED,
    payload: unanswered,
  };
}

function setAnsweredQuestions(questions, authedUser) {
  const questionVotes = getAllQuestionVotes(questions);

  let answered = [];

  for (const question of questionVotes) {
    const voted = question.votes.some(vote => vote === authedUser.id);
    if (voted) answered = [...answered, questions[question.id]];
  }
  return {
    type: SET_ANSWERED,
    payload: answered,
  };
}

export function handleGetQuestions(payload) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    _getQuestions().then(questions => {
      dispatch(setAllQuestions(questions));
      if (authedUser) {
        dispatch(setAnsweredQuestions(questions, authedUser));
        dispatch(setUnansweredQuestions(questions, authedUser));
      }
    });
  };
}

function getAllQuestionVotes(questions) {
  return Object.keys(questions).map(key => {
    return {
      votes: [
        ...questions[key].optionOne.votes,
        ...questions[key].optionTwo.votes,
      ],
      id: key,
    };
  });
}
