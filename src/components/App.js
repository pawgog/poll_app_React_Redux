import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import QuestionItem from './QuestionItem';
import ChangeAuthor from './ChangeAuthor';
import AuthorsRank from './AuthorsRank';
import LoginPanel from './Login';
import Nav from './Nav';

class App extends Component {
  render() {
    const { loading } = this.props;

    return (
      <Router>
        <Fragment>
          <div>
            {loading === true ? null :
            <Grid>
              <Row className="show-grid">
                <Col sm={10} md={10}>
                  <Nav />
                </Col>
                <Col sm={2} md={2}>
                  <ChangeAuthor />
                </Col>
              </Row>
            </Grid>
            }
            {loading === true ? (
              <div>
                <LoginPanel />
              </div>
            ) : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" component={LoginPanel} />
                <Route path="/question/:id" component={QuestionItem} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={AuthorsRank} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return authedUser === null ? {loading: true} : {loading: false}
}

export default connect(mapStateToProps)(App);
