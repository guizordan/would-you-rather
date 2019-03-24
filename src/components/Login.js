import React from "react";
import { _getUsers } from "../_DATA";
import { connect } from "react-redux";

class Login extends React.Component {
  componentDidMount() {
    console.log(_getUsers);
    _getUsers().then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <>
        <div className="card p-4">Login:</div>
      </>
    );
  }
}

export default connect()(Login);
