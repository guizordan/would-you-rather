import { _getQuestions } from "../_DATA";
import { _saveQuestionAnswer, _saveQuestion } from "../_DATA";
import { setUsers } from "./users";
import { push } from "connected-react-router";

import { SAVE_QUESTION_SUCCESS } from "./messages";

export const SET = "questions/SET";

function setQuestions(payload) {
  return {
    type: SET,
    payload,
  };
}

function saveQuestionSuccess(payload) {
  return (dispatch, getState) => {
    dispatch(setQuestions(payload));
    dispatch(push("/"));
    dispatch({
      type: SAVE_QUESTION_SUCCESS,
      payload: "Question saved successfuly!",
    });
  };
}

export function handleGetQuestions(payload) {
  return (dispatch, getState) => {
    _getQuestions().then(questions => {
      dispatch(setQuestions(questions));
    });
  };
}

export function handleSaveQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    _saveQuestion({ ...question, author: authedUser }).then(question => {
      const payload = { [question.id]: { ...question } };
      dispatch(saveQuestionSuccess(payload));
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

    _saveQuestionAnswer(questionAnswer).then(() => {
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

      /* Removes the user vote (if exists) from both options */
      question.optionOne.votes = question.optionOne.votes.filter(
        user => user !== authedUser,
      );
      question.optionTwo.votes = question.optionTwo.votes.filter(
        user => user !== authedUser,
      );
      /* Removes the user vote (if exists) from both options */

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
