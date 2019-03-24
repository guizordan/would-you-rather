import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../components/Navbar";

import Home from "./Home";
import Login from "./Login";

class App extends Component {
  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <div className="container">
          {authedUser && <Navbar />}

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />

            <Route path="/new-question" render={() => <>New Question</>} />
            <Route path="/leader-board" render={() => <>Leader Board</>} />
            <Route
              path="/questions/:question_id"
              render={() => <>Question: {this.props.match.question_id}</>}
            />

            {!authedUser && <Redirect to="/login" />}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
