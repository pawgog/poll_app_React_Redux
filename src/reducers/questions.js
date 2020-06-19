import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  TOGGLE_QUESTION,
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      console.log('ADD_QUESTION', state, 'action', action);
      return {
        ...state,
        [action.question.id]: action.question,
      };

    case TOGGLE_QUESTION:
      if (action.answer === 'optionOne') {
        if (
          state[action.qid]['optionTwo'].votes.includes(action.authedUser) ===
          true
        ) {
          let index = state[action.qid]['optionTwo'].votes.indexOf(
            action.authedUser
          );
          if (index > -1) {
            state[action.qid]['optionTwo'].votes.splice(index, 1);
          }
        }
        console.log(
          'TOGGLE_QUESTION one',
          state,
          'action',
          action,
          'state[action.id]',
          state
        );
        return {
          ...state,
          [action.qid]: {
            ...state[action.qid],
            optionOne:
              state[action.qid][action.answer].votes.includes(
                action.authedUser
              ) === true
                ? state[action.qid][action.answer]
                : {
                    text: state[action.qid][action.answer].text,
                    votes: state[action.qid][action.answer].votes.concat(
                      action.authedUser
                    ),
                  },
          },
        };
      } else if (action.answer === 'optionTwo') {
        if (
          state[action.qid]['optionOne'].votes.includes(action.authedUser) ===
          true
        ) {
          let index = state[action.qid]['optionOne'].votes.indexOf(
            action.authedUser
          );
          if (index > -1) {
            state[action.qid]['optionOne'].votes.splice(index, 1);
          }
        }
      }
      console.log(
        'TOGGLE_QUESTION two',
        state,
        'action',
        action,
        'state[action.id]',
        state
      );
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionTwo:
            state[action.qid][action.answer].votes.includes(
              action.authedUser
            ) === true
              ? state[action.qid][action.answer]
              : {
                  text: state[action.qid][action.answer].text,
                  votes: state[action.qid][action.answer].votes.concat(
                    action.authedUser
                  ),
                },
        },
      };
    default:
      return state;
  }
}
