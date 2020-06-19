import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PageHeader, Tabs, Tab } from 'react-bootstrap';
import Question from './Question';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1,
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    const { userQuestions, currentUser } = this.props;

    return (
      <div>
        <PageHeader className="text-center">Questions Board</PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col sm={12} md={12}>
              <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey={1} title="Unanswer Questions">
                  {this.props.userUnAnswers.length > 0 && (
                    <ul className="dashboard-list">
                      {this.props.userUnAnswers.map((id) => {
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
                  {this.props.userUnAnswers.length === 0 && (
                    <h2>There is no more unanswers questions!</h2>
                  )}
                </Tab>
                <Tab eventKey={2} title="Answer Questions">
                  <ul className="dashboard-list">
                    {this.props.userAnswers.map((id) => {
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
      if (array.includes(res) === true) {
        return null;
      } else {
        return userUnAnswers.push(res);
      }
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
