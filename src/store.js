import createRootReducer from "./reducers";

import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
  );
  return store;
}
