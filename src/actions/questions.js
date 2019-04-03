import { _getQuestions } from "../_DATA";
import { _saveQuestionAnswer } from "../_DATA";
import { setUsers } from "./users";

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

export function handleSaveQuestionAnswer(question, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    let { users } = getState();

    const questionAnswer = {
      authedUser: authedUser,
      qid: question.id,
      answer,
    };

    return _saveQuestionAnswer(questionAnswer).then(res => {
      console.log(question, answer);

      /* Updates the authedUser's answers */
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [question.id]: answer,
          },
        },
      };
      /* Updates the authedUser's answers */

      /* Updates the question's votes without duplicating */
      question = {
        [question.id]: {
          ...question,
          [answer]: {
            ...question[answer],
            votes: [...new Set([...question[answer].votes, authedUser])],
          },
        },
      };
      /* Updates the question's votes without duplicating */

      dispatch(setUsers(users));
      dispatch(setQuestions(question));
    });
  };
}
