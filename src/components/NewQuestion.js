import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import { handleAddQuestion } from '../actions/questions'


class NewQuestion extends Component {

    state = {
            optionOneText: '', 
            optionTwoText: '', 
            author: '',
            toHomePage: false,
    }
    
    handleChange = (name, e) => {
        console.log('New Question e:', name, e.target.value);

        const { dispatch, authedUser } = this.props
            this.state.author = authedUser;

        const contact = this.state;
            contact[name] = e.target.value;

        this.setState({ 
            question: contact
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { authedUser } = this.props

        const { question } = this.state
        const { dispatch } = this.props

        console.log('New Question', question);
        
        dispatch(handleAddQuestion(question))

        this.setState(() => ({
            toHome: true,
            optionOneText: '', 
            optionTwoText: '', 
        }))
        this.props.dispatch(handleInitialData(authedUser))
    }
    render() {
        const { toHome, optionOneText, optionTwoText } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
          }

        return(
            <div>
                <h1 className="newQuestion text-center">New Question</h1>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={12} md={12}>
                            <ControlLabel>Would you rather?</ControlLabel>
                            <form className="new-question" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <FormControl placeholder="First Option" value={optionOneText} onChange={this.handleChange.bind(this, 'optionOneText')}/>
                                    <FormControl placeholder="Second Option" value={optionTwoText} onChange={ this.handleChange.bind(this, 'optionTwoText')}/>
                                    <Button type="submit" disabled={optionOneText === '' && optionTwoText === ''}>Add</Button>
                                </FormGroup>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
function mapStateToProps ({authedUser, users, questions}, { id }) {
      
    const question = questions[id];
    

    return {
        authedUser
    }
  }

export default connect(mapStateToProps)(NewQuestion)