export function formatQuestion ( question, authedUser ) {
  const { id, timestamp, author, optionOne, optionTwo } = question


  return {
    id,
    timestamp,
    author,
    optionOne,
    optionTwo,
  }
}