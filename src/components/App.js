import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { persistStore, persistReducer, storage } from 'redux-persist';
import Dashboard from './Dashboard';
import Question from './Question';
import NewQuestion from './NewQuestion';
import QuestionItem from './QuestionItem';
import ChangeAuthor from './ChangeAuthor';
import AuthorsRank from './AuthorsRank';
import LoginPanel from './Login';
import Nav from './Nav';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <Grid>
              <Row className="show-grid">
                <Col sm={10} md={10}>
                  <Nav />
                </Col>
                <Col sm={2} md={2}>
                  {this.props.loading === true ? null : <ChangeAuthor />}
                </Col>
              </Row>
            </Grid>
            {this.props.loading === true ? (
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
  if (authedUser === null) {
    return {
      loading: true,
    };
  } else {
    return {
      loading: false,
    };
  }
}

export default connect(mapStateToProps)(App);
