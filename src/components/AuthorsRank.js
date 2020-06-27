import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class AuthorsRank extends Component {
  state = {
    authorAvatarDisplay: '',
  };

  render() {
    const { usersArray } = this.props;
    // let authorAvatarDisplay = '';

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col sm={12} md={12}>
              {usersArray.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="author-name-class container-detail"
                  >
                    <Col sm={4} md={4}>
                      <img
                        src={user.avatarURL}
                        width="100px"
                        height="100px"
                        alt="Sarah Edo"
                      />
                      <div>{user.name}</div>
                    </Col>
                    <Col sm={4} md={4}>
                      <div>
                        <span style={{ fontSize: 17 }}>
                          Answered questions:{' '}
                        </span>
                        <b>{Object.keys(user.answers).length}</b>
                      </div>
                      <div>
                        <span style={{ fontSize: 17 }}>
                          Created questions:{' '}
                        </span>
                        <b>{user.questions.length}</b>
                      </div>
                    </Col>
                    <Col sm={4} md={4}>
                      <span style={{ fontSize: 17 }}>Score: </span>
                      <b>
                        {Object.keys(user.answers).length +
                          user.questions.length}
                      </b>
                    </Col>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ users }, props) {
  let usersArray = Object.values(users);
  // let answeres = usersArray.answers;
  return {
    usersArray,
  };
}

export default connect(mapStateToProps)(AuthorsRank);
