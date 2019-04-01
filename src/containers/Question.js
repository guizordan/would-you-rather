import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class Question extends Component {
  state = {};

  render() {
    const { questions, users } = this.props;
    const { question_id } = this.props.match.params;
    const question = questions[question_id];

    console.log(questions, question_id);
    if (question) {
      return (
        <Card>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Header>{users[question.author].name} asked</Card.Header>
          <Card.Body>
            <Card.Title>Would You Rather...</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{question.optionOne.text}</ListGroupItem>
            <ListGroupItem>{question.optionTwo.text}</ListGroupItem>
          </ListGroup>
        </Card>
      );
    }

    return <></>;
  }
}

const mapStateToProps = ({ questions, users }) => ({ questions, users });
export default connect(mapStateToProps)(Question);
