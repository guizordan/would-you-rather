import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { Provider } from "react-redux";
import configureStore, { history } from "./store";
import { loadAuthedUser, saveAuthedUser } from "./localStorage";

import App from "./containers/App";
import LoadingBar from "react-redux-loading-bar";

import { UNSET_MESSAGES } from "./actions/messages";

const authedUser = loadAuthedUser();

const store = configureStore({ authedUser });

store.subscribe(() => {
  const { authedUser } = store.getState();
  if (authedUser) saveAuthedUser(authedUser);
});

history.listen(() => {
  store.dispatch({ type: UNSET_MESSAGES });
});

ReactDOM.render(
  <Provider store={store}>
    <LoadingBar />
    <App />
  </Provider>,
  document.getElementById("root"),
);
