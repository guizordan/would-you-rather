import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Bar extends Component {
  goTo = route => this.props.history.replace(route);

  render() {
    const { authedUser, unsetAuthedUser } = this.props;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={() => this.goTo("/")}>WYR?</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.goTo("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => this.goTo("/add")}>New Question</Nav.Link>
            <Nav.Link onClick={() => this.goTo("/leaderboard")}>
              Leaderboard
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              title={`Welcome, ${authedUser.name}!`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={unsetAuthedUser}>
                Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(
  mapStateToProps,
  { unsetAuthedUser },
)(withRouter(Bar));
