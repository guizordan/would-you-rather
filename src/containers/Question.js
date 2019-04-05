import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ListGroup, ListGroupItem, Button, Alert } from "react-bootstrap";
import Radio from "../components/Radio";

import { handleSaveQuestionAnswer } from "../actions/questions";
import Votes from "./Votes";
import { Link } from "react-router-dom";

class Question extends Component {
  state = {
    answer: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState, answer: prevState.answer || nextProps.answer };
  }

  selectAnswer = answer => {
    this.setState({ answer });
  };

  vote = e => {
    e.preventDefault();
    const { question, handleSaveQuestionAnswer } = this.props;
    const { answer } = this.state;

    handleSaveQuestionAnswer(question, answer);
  };

  render() {
    const { users, question } = this.props;

    if (question) {
      return (
        <>
          {this.props.answer && (
            <Alert variant="success">
              Thank you for sharing your opinion with us!{" "}
              <Link to="/"> Back to home</Link>
            </Alert>
          )}
          <Card className="mb-3">
            <form onSubmit={this.vote}>
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
              <Card.Header>{users[question.author].name} asked</Card.Header>
              <Card.Body>Would You Rather...</Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Radio
                    checked={this.state.answer}
                    value="optionOne"
                    onChange={this.selectAnswer}
                    label={<strong>{question.optionOne.text}</strong>}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <Radio
                    checked={this.state.answer}
                    value="optionTwo"
                    onChange={this.selectAnswer}
                    label={<strong>{question.optionTwo.text}</strong>}
                  />
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button
                  disabled={
                    !this.state.answer ||
                    this.state.answer === this.props.answer
                  }
                  variant="success"
                  type="submit"
                  block
                >
                  {(this.props.answer && "Change vote") || "Vote!"}
                </Button>
              </Card.Body>
            </form>
          </Card>

          <Votes className="mb-3" option={question.optionOne} />
          <Votes className="mb-3" option={question.optionTwo} />
        </>
      );
    }
    return <></>;
  }
}

const mapStateToProps = ({ questions, users, authedUser }, { match }) => {
  const { question_id } = match.params;
  const question = questions[question_id];
  const answer = users[authedUser].answers[question_id] || "";

  return {
    question,
    answer,
    users,
  };
};

export default connect(
  mapStateToProps,
  { handleSaveQuestionAnswer },
)(Question);
