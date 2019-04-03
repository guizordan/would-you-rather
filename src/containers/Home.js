import React, { Component } from "react";
import { handleGetQuestions } from "../actions/questions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Nav, Card } from "react-bootstrap";

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
            <Card.Text className="mb-0 font-weight-bold">
              Would you rather...
            </Card.Text>
            <Card.Title>{question.optionOne.text} or ...</Card.Title>
            <Link to={`questions/${question.id}`}>View Complete Poll</Link>
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
    users[authedUser].questions.some(
      userQuestion => userQuestion === question.id,
    ),
  );

  const unansweredQuestions = questions.filter(
    question =>
      !users[authedUser].questions.some(
        userQuestion => userQuestion === question.id,
      ),
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
