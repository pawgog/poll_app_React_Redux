import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleToggleQuestion } from '../actions/questions'
import { handleInitialData } from '../actions/shared'
import { Grid, Row, Col, ProgressBar } from 'react-bootstrap';
import NewQuestion from './NewQuestion'
import Question from './Question'


class QuestionItem extends Component {
    state = {
        authorAvatarDisplay: ''
    }

    changeSelect = (event, option) => {
   
        event.preventDefault();


    
        const { dispatch, question, authedUser, qid, optionOne, optionTwo } = this.props
         
        if(option === 'optionOne') {
            if(!optionOne.votes.includes(authedUser)){
                dispatch(handleToggleQuestion({
                    qid: question.id,
                    answer: option,
                    authedUser
                  }))
                  this.props.dispatch(handleInitialData(authedUser))
            }
        }else if(option === 'optionTwo') {
            if(!optionTwo.votes.includes(authedUser)){
                dispatch(handleToggleQuestion({
                    qid: question.id,
                    answer: option,
                    authedUser
                }))
                this.props.dispatch(handleInitialData(authedUser))
            }
        }
      }

    render(){
        const { id, authorName, authorNameData, optionOne, optionTwo, question, users } = this.props
        let authorAvatarDisplay = ''
        if(question !== 'error'){

        const currentVotesOne = optionOne.votes.length;
        const currentVotesTwo = optionTwo.votes.length;
        
        const maxUsers = Object.values(users).length;

        const currentVotesOnePercent = Math.round((optionOne.votes.length/maxUsers)*100);
        const currentVotesTwoPercent = Math.round((optionTwo.votes.length/maxUsers)*100);

        const authorAvatar = users[authorNameData].avatarURL;

    
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={12} md={12}>
                            <div id={id}>
                                <div className="authorNameClass containerDetail">
                                <Col sm={4} md={4}>
                                <h3>Author</h3>
                                <div className="question">
                                    <img src={authorAvatar} width="100px" height="100px" alt="Sarah Edo" />
                                    {authorName}
                                </div>
                                </Col>
                                <Col sm={4} md={4}>
                                <div>Would you rather?</div>
                                <h3 className="questionTitle" onClick={(e) => this.changeSelect(e, 'optionOne')}>{optionOne.text}</h3>
                                <div className="question">
                                    <span>Votes: </span><b>{optionOne.votes.length}</b>
                                    <ProgressBar striped bsStyle="info" max={maxUsers} now={currentVotesOne} label={`${currentVotesOnePercent}%`} />
                                </div>
                                </Col>
                                <Col sm={4} md={4}>
                                <div>Would you rather?</div>
                                <h3 className="questionTitle" onClick={(e) => this.changeSelect(e, 'optionTwo')}>{optionTwo.text}</h3>
                                <div className="question">
                                    <span>Votes: </span><b>{optionTwo.votes.length}</b>
                                    <ProgressBar striped bsStyle="info" max={maxUsers} now={currentVotesTwo} label={`${currentVotesTwoPercent}%`} />
                                </div>
                                </Col>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }else {
        return (
            <Grid>
                <Row className="show-grid text-center">
                    <Col sm={12} md={12}>
                        <p>Question doesn't existe</p>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
}

function mapStateToProps ({authedUser, users, questions}, props) {
 
    
    const { id } = props.match.params

    if(questions[id] === undefined) {
        const question = 'error';
        return {
            question
          }
    }else {
       const question = questions[id]; 
       const authorName = users[question.author].name;
       const authorNameData = users[question.author].id;
       const optionOne = question.optionOne;
       const optionTwo = question.optionTwo;


       return {
         id, authorName, authorNameData, optionOne, optionTwo, question, authedUser, users
       }
    }
    


}

export default connect(mapStateToProps)(QuestionItem)