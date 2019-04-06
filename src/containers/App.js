import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import protect from "../hocs/protect";

import Bar from "../components/Bar";

import Home from "./Home";
import Login from "./Login";
import Question from "./Question";

import classNames from "class-names";

import { handleGetUsers } from "../actions/users";
import { handleGetQuestions } from "../actions/questions";
import NewQuestion from "./NewQuestion";

class App extends Component {
  componentDidMount() {
    this.props.handleGetUsers();
    this.props.handleGetQuestions();
  }

  render() {
    const { authedUser, users, loadingBar } = this.props;

    if (users) {
      return (
        <Router>
          {authedUser && <Bar />}
          <div
            className={classNames("container mt-3", {
              invisible: loadingBar.default,
            })}
          >
            <Switch>
              <Route path="/" exact component={protect(Home)} />
              <Route path="/login" component={Login} />
              <Route
                path="/questions/:question_id"
                component={protect(Question)}
              />
              <Route path="/add" component={protect(NewQuestion)} />

              {/* <Route path="/leaderboard" render={() => <>Leader Board</>} /> */}
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </Router>
      );
    }

    return "";
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
