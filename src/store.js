import reducers from "./reducers";
import middlewares from "./middlewares";

import { createStore } from "redux";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const store = createStore(reducers, persistedState, middlewares);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
