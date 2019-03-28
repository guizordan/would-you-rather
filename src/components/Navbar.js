import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";

import { Nav, NavDropdown } from "react-bootstrap";

class Navbar extends React.Component {
  render() {
    const { authedUser, unsetAuthedUser } = this.props;

    return (
      <div className="row no-gutters">
        <div className="col">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                New Question
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">
                LeaderBoard
              </Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <Nav variant="tabs" activeKey="1">
            <NavDropdown
              title={`Welcome, ${authedUser.name}!`}
              id="nav-dropdown"
            >
              <NavDropdown.Item onClick={unsetAuthedUser} eventKey="4.1">
                Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(
  mapStateToProps,
  { unsetAuthedUser },
)(Navbar);
