import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <ul className="nav">
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
          <Link className="nav-link disabled" to="/">
            Exit
          </Link>
        </li>
      </ul>
    );
  }
}
