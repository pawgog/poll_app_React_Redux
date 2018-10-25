import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {


    return _saveQuestion(question)
      .catch((err) => {
      }).then((question) => dispatch(addQuestion(question)))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function toggleQuestion ({ authedUser, qid, answer }) {
  return {
    type: TOGGLE_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleToggleQuestion (authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(toggleQuestion(authedUser, qid, answer))

    return _saveQuestionAnswer(authedUser, qid, answer)
      .catch((err) => {
        dispatch(toggleQuestion(authedUser, qid, answer))
      })
  }
}