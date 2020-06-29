import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SelectAuthor from './SelectAuthor';
import { handleInitialData } from '../actions/shared';

class LoginPanel extends Component {
  state = {
    selectAuthor: '',
    toHome: false,
  };

  handleChange = (e) => {
    const selectAuthor = e.target.value;
    this.setState(() => ({
      selectAuthor,
      toHome: true,
    }));
    this.props.dispatch(handleInitialData(selectAuthor));
  };

  render() {
    const { selectAuthor, toHome } = this.state;
    // const { userQuestions, currentUser, authorAvatar } = this.props;

    let authorAvatarDisplay = '';
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="sign-in-author">
        <h1>Please Sign In</h1>
        <SelectAuthor classAfterLogin={false} selectAuthor={selectAuthor} handleChangeFn={this.handleChange} />
        <div>{authorAvatarDisplay}</div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  let currentUser = '';
  let authorAvatar = '';
  if (authedUser !== null) {
    currentUser = users[authedUser].name;
    authorAvatar = users[authedUser].avatarURL;
  }
  return {
    currentUser,
    authorAvatar,
  };
}

export default connect(mapStateToProps)(LoginPanel);
