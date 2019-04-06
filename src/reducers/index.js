import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { connectRouter } from "connected-react-router";

/* reducers */
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
/* reducers */

export default history =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    users,
    authedUser,
    questions,
  });
