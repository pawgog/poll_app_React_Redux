import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TiExportOutline from 'react-icons/lib/ti/export-outline';
import SelectAuthor from './SelectAuthor';
import { handleInitialData } from '../actions/shared';

class ChangeAuthor extends Component {
  state = {
    selectAuthor: '',
    toLogin: false,
  };

  handleChange = (e) => {
    const selectAuthor = e.target.value;
    this.setState(() => ({
      selectAuthor,
    }));
    this.props.dispatch(handleInitialData(selectAuthor));
  };
  logout = () => {
    if (window.confirm('Are you sure you wish to logout?')) {
      this.setState(() => ({
        selectAuthor: '',
        toLogin: true,
      }));
      this.props.dispatch(handleInitialData(null));
    }
  };
  render() {
    const { selectAuthor, toLogin } = this.state;
    const { authorAvatar, currentUser } = this.props;

    // let authorAvatarDisplay = '';

    if (toLogin === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="author-name-class">
        <div>
          <img src={authorAvatar} width="50px" height="50px" alt={currentUser} />
        </div>
        <SelectAuthor classAfterLogin={true} selectAuthor={selectAuthor} handleChangeFn={this.handleChange} />
        <div className="logout-button" onClick={this.logout}>
          Logout
          <TiExportOutline className="tweet-icon" />
        </div>
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

export default connect(mapStateToProps)(ChangeAuthor);
