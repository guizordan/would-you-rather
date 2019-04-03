import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ListGroup, ListGroupItem, Button, Alert } from "react-bootstrap";
import Radio from "../components/Radio";

import { handleSaveQuestionAnswer } from "../actions/questions";
import Votes from "./Votes";

class Question extends Component {
  state = {
    answer: "",
    showAlert: false,
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(prevState);
  //   return { ...prevState, answer: prevState.answer || nextProps.answer };
  // }

  componentDidUpdate() {
    console.log("up");
  }

  selectAnswer = answer => {
    this.setState({ answer });
  };

  vote = () => {
    const { question, handleSaveQuestionAnswer } = this.props;
    const { answer } = this.state;

    handleSaveQuestionAnswer(question, answer).then(() => {
      this.setState({ showAlert: true });
    });
  };

  render() {
    const { answer, showAlert } = this.state;
    const { users, question } = this.props;

    if (question) {
      return (
        <>
          {showAlert && (
            <Alert variant="success">
              Thank you for sharing your opinion with us!
            </Alert>
          )}
          <Card className="mb-3">
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Header>{users[question.author].name} asked</Card.Header>
            <Card.Body>Would You Rather...</Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Radio
                  checked={answer}
                  value="optionOne"
                  onChange={this.selectAnswer}
                  label={<strong>{question.optionOne.text}</strong>}
                />
              </ListGroupItem>
              <ListGroupItem>
                <Radio
                  checked={answer}
                  value="optionTwo"
                  onChange={this.selectAnswer}
                  label={<strong>{question.optionTwo.text}</strong>}
                />
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button
                onClick={this.vote}
                disabled={!answer}
                variant="success"
                block
              >
                Vote!
              </Button>
            </Card.Body>
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
  console.log("oi");

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
