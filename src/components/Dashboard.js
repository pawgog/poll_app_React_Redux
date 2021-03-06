import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PageHeader, Tabs, Tab } from 'react-bootstrap';
import Question from './Question';

class Dashboard extends Component {
  state = {
      key: 1,
    };

  handleSelect = (key) => {
    this.setState({ key });
  }

  render() {
    const { userAnswers, userUnAnswers } = this.props;
    const { key } = this.state;

    return (
      <div>
        <PageHeader className="text-center">Questions Board</PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col sm={12} md={12}>
              <Tabs
                activeKey={key}
                onSelect={this.handleSelect}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey={1} title="Unanswer Questions">
                  {userUnAnswers.length > 0 && (
                    <ul className="dashboard-list">
                      {userUnAnswers.map((id) => {
                        return (
                          <div key={id}>
                            <li>
                              <div>Would you rather?</div>
                              <Question id={id}></Question>
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  )}
                  {userUnAnswers.length === 0 && (
                    <h2>There is no more unanswers questions!</h2>
                  )}
                </Tab>
                <Tab eventKey={2} title="Answer Questions">
                  <ul className="dashboard-list">
                    {userAnswers.map((id) => {
                      return (
                        <div key={id}>
                          <li>
                            <div>Would you rather?</div>
                            <Question id={id[0]} option={id[1]}></Question>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  let userQuestions = users[authedUser].answers;
  let currentUser = users[authedUser].name;
  let array = Object.keys(userQuestions);
  let userUnAnswers = [];
  Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .forEach((res, i) => {
      return array.includes(res) === true ? null : userUnAnswers.push(res)
    });

  let userAnswers = Object.keys(userQuestions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .map((res, i) => {
      return [res, userQuestions[res]];
    });

  return {
    currentUser,
    userAnswers,
    userUnAnswers,
    questionAnswer: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
