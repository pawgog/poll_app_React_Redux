import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      <div className="signInAuthor">
        <h1>Please Sign In</h1>
        <select
          id="authorName"
          value={selectAuthor}
          onChange={this.handleChange}
        >
          <option value="" disabled>
            Choose author
          </option>
          <option value="sarahedo">Sarah Edo</option>
          <option value="johndoe">John Doe</option>
          <option value="tylermcginnis">Tyler McGinnis</option>
        </select>
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
