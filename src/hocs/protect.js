import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @description prevents an unidentified user from accessing some component
 */
const protect = Component => props => {
  const { authedUser, ...rest } = props;

  if (!authedUser)
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: props.location.pathname },
        }}
      />
    );

  return <Component {...rest} />;
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

const composedProtect = compose(
  connect(mapStateToProps),
  protect,
);

export default composedProtect;
