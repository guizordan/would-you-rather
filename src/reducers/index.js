import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

/* reducers */
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
/* reducers */

const reducers = combineReducers({
  loadingBar: loadingBarReducer,
  users,
  authedUser,
  questions,
});

export default reducers;
