import React from "react";

import Select from "../components/Select";

import { handleSetAuthedUser } from "../actions/authedUser";

import { connect } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    selectedUser: "",
  };

  enter = e => {
    e.preventDefault();
    const { handleSetAuthedUser, location } = this.props;
    const { selectedUser } = this.state;
    handleSetAuthedUser(selectedUser, location.state.referrer);
  };

  render() {
    const { users, authedUser } = this.props;
    const { selectedUser } = this.state;
    if (authedUser) return <Redirect to="/" />;

    return (
      <form onSubmit={this.enter}>
        <Card className="text-center">
          <Card.Body>
            <div>
              <h4>Welcome!</h4>
              <p className="text-muted">Select a user to begin.</p>
            </div>
            <div className="form-group">
              <Select
                id="id"
                label="name"
                value={selectedUser}
                options={users}
                placeholder="Choose one"
                onChangeValue={selectedUser => this.setState({ selectedUser })}
              />
            </div>
            <Button
              block
              type="submit"
              variant="primary"
              disabled={!selectedUser}
            >
              Enter
            </Button>
          </Card.Body>
        </Card>
      </form>
    );
  }
}
const mapStateToProps = ({ users, authedUser }) => {
  return {
    users: Object.values(users),
    authedUser,
  };
};

export default connect(
  mapStateToProps,
  { handleSetAuthedUser },
)(Login);
