import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleUnsetAuthedUser } from "../actions/authedUser";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

/**
 * @description Application's navigation bar
 */
class Bar extends Component {
  state = {
    expanded: false
  };

  goTo = route =>
    this.setState({ expanded: false }, this.props.history.replace(route));

  render() {
    const { authedUser, handleUnsetAuthedUser, users } = this.props;
    const { expanded } = this.state;
    if (!authedUser) return "";

    return (
      <Navbar
        expanded={expanded}
        onToggle={() => this.setState({ expanded: !expanded })}
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Link to="/">
          <Navbar.Brand>WYR?</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.goTo("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => this.goTo("/add")}>New Question</Nav.Link>
            <Nav.Link onClick={() => this.goTo("/leaderboard")}>
              Leaderboard
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              title={`Welcome, ${users[authedUser].name}!`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  this.setState({ expanded: false });
                  handleUnsetAuthedUser();
                }}
              >
                Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users
});

export default connect(
  mapStateToProps,
  { handleUnsetAuthedUser }
)(withRouter(Bar));
