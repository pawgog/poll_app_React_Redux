import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { SplitButton, MenuItem } from 'react-bootstrap';
import TiExportOutline from  'react-icons/lib/ti/export-outline';
import { handleInitialData } from '../actions/shared'


class ChangeAuthor extends Component {
    state = {
        selectAuthor: '',
        toLogin: false
    }
    
    handleChange = (e) => {
        const selectAuthor = e.target.value
        this.setState(() => ({
            selectAuthor
        }))
        this.props.dispatch(handleInitialData(selectAuthor))
    }
    logout = () => {
        if (window.confirm('Are you sure you wish to logout?')){
            this.setState(() => ({
                selectAuthor: '',
                toLogin: true
            }))
                this.props.dispatch(handleInitialData(null))
            }
    }
    render() {
        const { selectAuthor, toLogin } = this.state
        const { userQuestions, currentUser, authorAvatar } = this.props;

        let authorAvatarDisplay = ''

        if (toLogin === true) {
            return <Redirect to='/login' />
            }
        return(
            <div
            className="authorNameClass"
            >
            <div className="logoutButton" onClick={this.logout}>Logout<TiExportOutline className='logoutIcon tweet-icon' /></div>
            <div><img src={authorAvatar} width="50px" height="50px" alt="Sarah Edo" /></div>
            <select 
                id="authorName"
                value={this.state.selectAuthor} 
                onChange={this.handleChange} 
            >
                <option value="" disabled>Choose author</option>
                <option value="sarahedo">Sarah Edo</option>
                <option value="johndoe">John Doe</option>
                <option value="tylermcginnis">Tyler McGinnis</option>
            </select>
            </div>
            
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
 
    let currentUser = ''
    let authorAvatar = ''
    if(authedUser !== null){
        currentUser = users[authedUser].name;
        authorAvatar = users[authedUser].avatarURL;
    }
        return {
            currentUser,
            authorAvatar
    }

  }

export default connect(mapStateToProps)(ChangeAuthor)