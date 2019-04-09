import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Quantifier from "../components/Quantifier";

class Votes extends PureComponent {
  static propTypes = {
    question: PropTypes.object.isRequired
  };

  render() {
    const { question, users, className, totalVotes } = this.props;
    const options = [question.optionOne, question.optionTwo];

    return options.map((option, index) => {
      const percentage = ((100 * option.votes.length) / totalVotes).toFixed(2);

      return (
        <Card key={index} className={className}>
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
    });
  }
}

const mapStateToProps = ({ users }, { question }) => {
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  return { users, question, totalVotes };
};

export default connect(mapStateToProps)(Votes);
