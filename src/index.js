import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { push } from "connected-react-router";
import { Provider } from "react-redux";
import configureStore from "./store";
import { loadAuthedUser, saveAuthedUser } from "./localStorage";

import App from "./containers/App";
import LoadingBar from "react-redux-loading-bar";

const authedUser = loadAuthedUser();

const store = configureStore({ authedUser });

store.subscribe(() => {
  const { authedUser } = store.getState();
  if (authedUser) saveAuthedUser(authedUser);
});

store.dispatch(push("/add"));

ReactDOM.render(
  <Provider store={store}>
    <LoadingBar />
    <App />
  </Provider>,
  document.getElementById("root"),
);
