import { combineReducers } from "redux";

/* reducers */
import authedUser from "./authedUser";
import users from "./users";
/* reducers */

const reducers = combineReducers({
  users,
  authedUser,
});

export default reducers;
