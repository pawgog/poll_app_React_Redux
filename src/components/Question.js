import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import { handleToggleQuestion } from '../actions/questions'
import { handleInitialData } from '../actions/shared'
import { Grid, Row, Col } from 'react-bootstrap';
import TiMediaRecordOutline from 'react-icons/lib/ti/media-record-outline';
import TiTickOutline from 'react-icons/lib/ti/tick-outline';
import TiTimesOutline from 'react-icons/lib/ti/times-outline';
import IoDocumentText from 'react-icons/lib/io/document-text';



class Question extends Component {

  state = {
    toQuestion: false,
  }

  changeSelect = (event, option) => {
 
    event.preventDefault();

    const { dispatch, question, authedUser, qid, optionTwo } = this.props
      console.log('changeSelect', qid, question, authedUser, question.optionOne.votes.indexOf(authedUser), optionTwo)
    dispatch(handleToggleQuestion({
      qid: question.id,
      answer: option,
      authedUser
    }))
    dispatch(handleInitialData(authedUser))
    this.setState(() => ({
      toQuestion: true,
    }))
  }

    render() {
      const { question, option } = this.props;
      const { toQuestion } = this.state
      const { optionOne, optionTwo, id } = question
      console.log('question', question);
      
      // const authorName = users[author].name;
      if(toQuestion === true){
        return (
          <Redirect to={`/question/${id}`} />
        )
      }

      if(question === null) {
        return <p>Question doesn`t existe</p>
      }
      else {
      return (
      <div className="containerQuestion">
        <Grid>
          <Row className="show-grid text-center">
            <Col sm={11} md={11}>
            <div className="changeSelect" onClick={(e) => this.changeSelect(e, 'optionOne')}>
              <div id={id} className={`questionNew ${option === 'optionOne' ? 'questionAnswer':''} ${option === 'optionTwo' ? 'questionUnAnswer':''}`}>
              {option === undefined ?
                <TiMediaRecordOutline className='tweet-icon' />
                :
                <TiTickOutline className='tweet-icon' />
              }
              {optionOne.text}</div>
            </div>
            <div className="changeSelect" onClick={(e) => this.changeSelect(e, 'optionTwo')}>
              <div id={id} className={`questionNew ${option === 'optionOne' ? 'questionUnAnswer':''} ${option === 'optionTwo' ? 'questionAnswer':''}`}>
              {option === undefined ?
                <TiMediaRecordOutline className='tweet-icon' />
                :
                <TiTimesOutline className='tweet-icon' />
              }
              {optionTwo.text}</div>
            </div>      
            </Col>
            <Col sm={1} md={1}>
            <Link to={`/question/${id}`}>
            <div id={id}>
              <IoDocumentText size={35} color={'white'} style={{marginTop: '20px'}} className='tweet-icon' />
            </div>
            </Link>
            </Col>
          </Row>
        </Grid>
        <hr/>
      </div>
      )
    }
    }
  }
  function mapStateToProps ({authedUser, users, questions}, { id }) {
      
    const question = questions[id];
    const authorName = users[question.author].name;
 

    return {
        authedUser,
        authorName,
        question: question ? formatQuestion(question, authedUser) : null
    }
  }

  export default connect(mapStateToProps)(Question)