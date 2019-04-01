import React, { Component } from "react";
import { handleGetQuestions } from "../actions/questions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Nav, Card, Button } from "react-bootstrap";

class Home extends Component {
  state = {
    activeTab: "unanswered",
  };

  renderPolls = questions => {
    const { users } = this.props;
    return questions.map(question => {
      return (
        <Card key={question.id} className="mb-3">
          <Card.Header>{users[question.author].name} asked</Card.Header>
          <Card.Body>
            <Card.Title>Would you rather...</Card.Title>
            <Card.Text>{question.optionOne.text} or ...</Card.Text>
            <Link to={`questions/${question.id}`}>
              <Button variant="success" block>
                View Complete Poll
              </Button>
            </Link>
          </Card.Body>
        </Card>
      );
    });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <Nav
          fill
          variant="tabs"
          onSelect={activeTab => this.setState({ activeTab })}
        >
          <Nav.Item>
            <Nav.Link active={activeTab === "unanswered"} eventKey="unanswered">
              Unanswered
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === "answered"} eventKey="answered">
              Answered
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="pt-2">
          {this.state.activeTab === "unanswered"
            ? this.renderPolls(this.props.unansweredQuestions)
            : this.renderPolls(this.props.answeredQuestions)}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ users, authedUser, questions }) => {
  questions = Object.values(questions);

  const answeredQuestions = questions.filter(question =>
    authedUser.questions.some(userQuestion => userQuestion === question.id),
  );

  const unansweredQuestions = questions.filter(
    question =>
      !authedUser.questions.some(userQuestion => userQuestion === question.id),
  );

  return {
    users,
    questions,
    answeredQuestions,
    unansweredQuestions,
  };
};

export default connect(
  mapStateToProps,
  { handleGetQuestions },
)(Home);
