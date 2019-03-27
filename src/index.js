import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import { Provider } from "react-redux";
import store from "./store";

import App from "./containers/App";
import LoadingBar from "react-redux-loading-bar";

ReactDOM.render(
  <Provider store={store}>
    <LoadingBar />
    <App />
  </Provider>,
  document.getElementById("root"),
);
