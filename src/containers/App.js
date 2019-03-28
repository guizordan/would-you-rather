import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import protect from "../hocs/protect";

import Navbar from "../components/Navbar";

import Home from "./Home";
import Login from "./Login";
import classNames from "class-names";

class App extends Component {
  render() {
    const { authedUser, loadingBar } = this.props;

    return (
      <div
        className={classNames("container", { invisible: loadingBar.default })}
      >
        <Router>
          {authedUser && <Navbar />}

          <Switch>
            <Route path="/" exact component={protect(Home)} />
            <Route path="/login" component={Login} />

            {/* <Route path="/new-question" render={() => <>New Question</>} />
            <Route path="/leader-board" render={() => <>Leader Board</>} />
            <Route
              path="/questions/:question_id"
              render={() => <>Question: {this.props.match.question_id}</>}
            /> */}

            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, loadingBar }) => ({
  loadingBar,
  authedUser,
});

export default connect(mapStateToProps)(App);
