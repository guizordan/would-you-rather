import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Radio from "../components/Radio";

class Question extends Component {
  state = {
    selectedOption: "",
  };

  selectOption = option => {
    this.setState({ selectedOption: option });
  };

  render() {
    const { selectedOption } = this.state;
    const { questions, users } = this.props;
    const { question_id } = this.props.match.params;
    const question = questions[question_id];

    if (question) {
      return (
        <>
          <Card className="mb-3">
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Header>{users[question.author].name} asked</Card.Header>
            <Card.Body>
              <Card.Title>Would You Rather...</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Radio
                  checked={selectedOption}
                  value="option-one"
                  onChange={this.selectOption}
                  label={question.optionOne.text}
                />
              </ListGroupItem>
              <ListGroupItem>
                <Radio
                  checked={selectedOption}
                  value="option-two"
                  onChange={this.selectOption}
                  label={question.optionOne.text}
                />
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Button disabled={!selectedOption} variant="success" block>
            Vote!
          </Button>
        </>
      );
    }

    return <></>;
  }
}

const mapStateToProps = ({ questions, users }) => ({ questions, users });
export default connect(mapStateToProps)(Question);
