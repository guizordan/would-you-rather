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
import classNames from "class-names";

import { handleGetUsers } from "../actions/users";

class App extends Component {
  componentDidMount() {
    this.props.handleGetUsers();
  }

  render() {
    const { authedUser, users, loadingBar } = this.props;

    if (users) {
      return (
        <Router>
          {authedUser && <Bar />}
          <div
            className={classNames("container", {
              invisible: loadingBar.default,
            })}
          >
            <Switch>
              <Route path="/" exact component={protect(Home)} />
              <Route path="/login" component={Login} />

              {/* <Route path="/add" render={() => <>New Question</>} />
          <Route path="/leaderboard" render={() => <>Leader Board</>} /> */}

              {/* <Route
            path="/questions/:question_id"
            render={() => <>Question: {this.props.match.question_id}</>}
          /> */}

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
  { handleGetUsers },
)(App);
