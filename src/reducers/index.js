import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

/* reducers */
import authedUser from "./authedUser";
import users from "./users";
/* reducers */

const reducers = combineReducers({
  loadingBar: loadingBarReducer,
  users,
  authedUser,
});

export default reducers;
