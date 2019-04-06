import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, Button, Alert, Form } from "react-bootstrap";

import { handleSaveQuestion } from "../actions/questions";
import { Link } from "react-router-dom";

class Question extends Component {
  state = {
    question: "",
    optionOneText: "",
    optionTwoText: "",
  };

  createQuestion = e => {
    e.preventDefault();
    const { question, optionOneText, optionTwoText } = this.state;

    this.props.handleSaveQuestion({ question, optionOneText, optionTwoText });
  };

  render() {
    const { question, optionOneText, optionTwoText } = this.state;
    const submitDisabled = !question || !optionOneText || !optionTwoText;

    return (
      <>
        {this.props.answer && (
          <Alert variant="success">
            Thank you for sharing your opinion with us!{" "}
            <Link to="/"> Back to home</Link>
          </Alert>
        )}
        <Card className="mb-3">
          <Card.Header>Create a new Poll</Card.Header>
          <Form onSubmit={this.createQuestion}>
            <Card.Body>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  value={question}
                  placeholder="Would you rather..."
                  onChange={e => this.setState({ question: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Option One</Form.Label>
                <Form.Control
                  type="text"
                  value={optionOneText}
                  placeholder="Option 1"
                  onChange={e =>
                    this.setState({ optionOneText: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Option Two</Form.Label>
                <Form.Control
                  type="text"
                  value={optionTwoText}
                  placeholder="Option 2"
                  onChange={e =>
                    this.setState({ optionTwoText: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                disabled={submitDisabled}
                variant="success"
                type="submit"
                block
              >
                Create
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </>
    );
  }
}

export default connect(
  null,
  { handleSaveQuestion },
)(Question);
