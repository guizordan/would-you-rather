import { _getQuestions } from "../_DATA";
import { _saveQuestionAnswer, _saveQuestion } from "../_DATA";
import { setUsers } from "./users";
import { push } from "connected-react-router";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import {
  SAVE_QUESTION_SUCCESS,
  SAVE_QUESTION_ERROR,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SAVE_QUESTION_ANSWER_ERROR
} from "./messages";

export const SET = "@@questions/SET";

/* Action Creators */
function setQuestions(payload) {
  return dispatch => {
    dispatch({
      type: SET,
      payload
    });
    dispatch(hideLoading());
  };
}

function saveQuestionSuccess(questions, users) {
  return dispatch => {
    dispatch(setUsers(users));
    dispatch(setQuestions(questions));
    dispatch(push("/"));
    dispatch({
      type: SAVE_QUESTION_SUCCESS,
      message: "Question saved successfuly!"
    });
    dispatch(hideLoading());
  };
}

function saveQuestionError() {
  return dispatch => {
    dispatch({
      type: SAVE_QUESTION_ERROR,
      message: "Oops! Something went wrong :( Please, try again later!"
    });
    dispatch(hideLoading());
  };
}

function saveQuestionAnswerSuccess(users, question) {
  return (dispatch, getState) => {
    dispatch(setUsers(users));
    dispatch(setQuestions(question));
    dispatch({
      type: SAVE_QUESTION_ANSWER_SUCCESS,
      message: "Thank you for sharing your opinion with us!"
    });
  };
}

function saveQuestionAnswerError() {
  return {
    type: SAVE_QUESTION_ANSWER_ERROR,
    message: "Oops! Something went wrong :( Please, try again later!"
  };
}
/* Action Creators */

/* Thunks */
export function handleGetQuestions() {
  return (dispatch, getState) => {
    dispatch(showLoading());

    _getQuestions().then(questions => {
      dispatch(setQuestions(questions));
    });
  };
}

export function handleSaveQuestion(question) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    let { users } = getState();

    _saveQuestion({ ...question, author: authedUser })
      .then(question => {
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            questions: [...users[authedUser].questions, question.id]
          }
        };

        question = { [question.id]: { ...question } };

        dispatch(saveQuestionSuccess(question, users));
      })
      .catch(() => dispatch(saveQuestionError()));
  };
}

export function handleSaveQuestionAnswer(question, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    let { users } = getState();

    const questionAnswer = {
      authedUser: authedUser,
      qid: question.id,
      answer
    };

    _saveQuestionAnswer(questionAnswer)
      .then(() => {
        /* Updates the authedUser's answers */
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [question.id]: answer
            }
          }
        };
        /* Updates the authedUser's answers */

        /* Removes the user vote (if exists) from both options */
        question.optionOne.votes = question.optionOne.votes.filter(
          user => user !== authedUser
        );
        question.optionTwo.votes = question.optionTwo.votes.filter(
          user => user !== authedUser
        );
        /* Removes the user vote (if exists) from both options */

        /* Updates the question's votes without duplicating */
        question = {
          [question.id]: {
            ...question,
            [answer]: {
              ...question[answer],
              votes: [...new Set([...question[answer].votes, authedUser])]
            }
          }
        };
        /* Updates the question's votes without duplicating */
        dispatch(saveQuestionAnswerSuccess(users, question));
      })
      .catch(() => dispatch(saveQuestionAnswerError()));
  };
}
/* Thunks */
