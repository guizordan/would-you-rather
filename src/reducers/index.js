import { combineReducers } from "redux";

/* reducers */
import users from "./users";
/* reducers */

const reducers = combineReducers({
  users,
});

export default reducers;
