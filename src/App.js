import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <ul className="nav mt-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-question">
                New Question
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leader-board">
                Leader Board
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link disabled"
                to="/"
                tabindex="-1"
                aria-disabled="true"
              >
                Exit
              </Link>
            </li>
          </ul>
          <Route path="/" exact render={() => <>Home</>} />
          <Route path="/login" component={Login} />
          <Route path="/new-question" render={() => <>New Question</>} />
          <Route path="/leader-board" render={() => <>Leader Board</>} />
          <Route
            path="/questions/:question_id"
            render={() => <>Question: {this.props.match.question_id}</>}
          />
        </div>
      </Router>
    );
  }
}

export default App;
