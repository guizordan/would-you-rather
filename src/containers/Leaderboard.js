import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class Leaderboard extends Component {
  render() {
    const { leaderboard } = this.props;
    return (
      <div className="row no-gutters justify-content-center">
        {leaderboard.map((user, index) => {
          return (
            <Card
              key={user.id}
              style={{ width: "300px" }}
              className="ml-2 mr-2 mb-3"
            >
              <Card.Body>
                <strong>{index + 1}º </strong>
                {user.name}
              </Card.Body>
              <img src={user.avatarURL} alt={user.name} />
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Questions asked: <strong>{user.questions.length}</strong>
                </ListGroupItem>
                <ListGroupItem>
                  Questions answered:{" "}
                  <strong>{Object.keys(user.answers).length}</strong>
                </ListGroupItem>
              </ListGroup>
            </Card>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ questions, users }) => {
  const leaderboard = Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers).length + a.questions.length)
  );

  return {
    questions,
    leaderboard
  };
};

export default connect(mapStateToProps)(Leaderboard);
