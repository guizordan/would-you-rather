import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store";

import protect from "../hocs/protect";

import Bar from "../components/Bar";

/* Routes */
import Home from "./Home";
import Login from "./Login";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NotFound from "../components/NotFound";
/* Routes */

import { handleGetUsers } from "../actions/users";
import { handleGetQuestions } from "../actions/questions";

class App extends Component {
  componentDidMount() {
    const { handleGetUsers, handleGetQuestions } = this.props;
    handleGetUsers();
    handleGetQuestions();
  }

  render() {
    const { loadingBar } = this.props;
    const isLoading =
      (Object.entries(loadingBar).length === 0 &&
        loadingBar.constructor === Object) ||
      loadingBar.default > 0;

    if (isLoading) return <div className="bg-loading" />;
    return (
      <ConnectedRouter history={history}>
        <Bar />
        <div className="container mt-3">
          <Switch>
            <Route path="/" exact component={protect(Home)} />
            <Route path="/login" component={Login} />
            <Route path="/add" component={protect(NewQuestion)} />
            <Route path="/leaderboard" component={protect(Leaderboard)} />
            <Route
              path="/questions/:question_id"
              component={protect(Question)}
            />

            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({ authedUser, users, loadingBar }) => ({
  authedUser,
  users,
  loadingBar,
});

export default connect(
  mapStateToProps,
  { handleGetUsers, handleGetQuestions },
)(App);
