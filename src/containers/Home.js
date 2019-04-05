import React, { Component } from "react";
import { handleGetQuestions } from "../actions/questions";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";
import PollList from "./PollList";

class Home extends Component {
  state = {
    activeTab: "unanswered",
  };

  render() {
    const { activeTab } = this.state;
    const { answeredQuestions, unansweredQuestions } = this.props;
    const questions =
      activeTab === "unanswered" ? unansweredQuestions : answeredQuestions;

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
          <PollList questions={questions} />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ users, authedUser, questions }) => {
  questions = Object.values(questions);

  const answeredQuestions = questions.filter(
    question => users[authedUser].answers[question.id],
  );

  const unansweredQuestions = questions.filter(
    question => !users[authedUser].answers[question.id],
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
