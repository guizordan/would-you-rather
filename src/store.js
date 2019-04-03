import reducers from "./reducers";
import middlewares from "./middlewares";

import { createStore } from "redux";
import { loadAuthedUser, saveAuthedUser } from "./localStorage";

const authedUser = loadAuthedUser();

const store = createStore(reducers, { authedUser }, middlewares);

store.subscribe(() => {
  const { authedUser } = store.getState();
  if (authedUser) saveAuthedUser(authedUser);
});

export default store;
