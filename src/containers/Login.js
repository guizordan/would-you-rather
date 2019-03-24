import React from "react";

import Select from "../components/Select";

import { handleSetAuthedUser } from "../actions/authedUser";
import { handleGetUsers } from "../actions/users";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    user: "",
  };

  componentDidMount() {
    this.props.handleGetUsers();
  }

  submit = e => {
    e.preventDefault();
    this.props.handleSetAuthedUser(this.state.user);
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <div className="card p-4 text-center">
          <div>
            <h4>Welcome!</h4>
            <p className="text-muted">Select a user to begin.</p>
          </div>
          <div className="form-group">
            <Select
              placeholder="Choose one"
              value={this.state.user}
              label="name"
              id="id"
              options={this.props.users}
              onChangeValue={user => this.setState({ user })}
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={this.submit}
          >
            Enter
          </button>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(
  mapStateToProps,
  { handleGetUsers, handleSetAuthedUser },
)(Login);
