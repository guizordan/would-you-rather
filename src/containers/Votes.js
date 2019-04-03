import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Quantifier from "../components/Quantifier";

class Votes extends PureComponent {
  static propTypes = {
    option: PropTypes.object.isRequired,
  };

  render() {
    const { option, users, className, percentage } = this.props;

    return (
      <Card className={className}>
        <Card.Body>
          <p className="font-weight-bold m-0">
            <Quantifier
              quantity={option.votes.length}
              plural="people"
              singular="person"
            />{" "}
            <small>({percentage}%)</small> voted on
          </p>
          {option.text}
        </Card.Body>
        <ListGroup className="list-group-flush">
          {option.votes.map(userId => (
            <ListGroupItem key={userId}>{users[userId].name}</ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    );
  }
}

const mapStateToProps = ({ users }, { option }) => {
  const totalUsers = Object.keys(users).length;
  const percentage = ((100 * option.votes.length) / totalUsers).toFixed(2);

  return { users, percentage, option };
};

export default connect(mapStateToProps)(Votes);
