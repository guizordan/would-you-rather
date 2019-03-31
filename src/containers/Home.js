import React, { Component } from "react";
import { handleGetQuestions } from "../actions/questions";
import { connect } from "react-redux";

import { Nav } from "react-bootstrap";

class Home extends Component {
  state = {
    activeTab: "unanswered",
  };

  componentDidMount() {
    this.props.handleGetQuestions();
  }

  renderUnansweredQuestions = () => {
    const { questions, users } = this.props;
    return questions.unanswered.map(question => {
      return (
        <div className="card p-3" key={question.id}>
          {users[question.author].name}
        </div>
      );
    });
  };

  renderPolls = () =>
    this.state.activeTab === "unanswered"
      ? this.renderUnansweredQuestions()
      : this.renderUnansweredQuestions();

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
        <div className="pt-2">{this.renderPolls()}</div>
      </>
    );
  }
}

const mapStateToProps = ({ users, questions }) => ({
  users,
  questions,
});

export default connect(
  mapStateToProps,
  { handleGetQuestions },
)(Home);
