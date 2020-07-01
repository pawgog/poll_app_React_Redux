import React from 'react';

export default function SelectAuthor({ classAfterLogin, authedUser, selectAuthor, handleChangeFn }) {
  return (
    <select
      className={classAfterLogin ? "" : "author-name"}
      value={selectAuthor === "" ? authedUser === undefined ? "" : authedUser : selectAuthor}
      onChange={handleChangeFn}
    >
      <option value="" disabled>
        Choose author
      </option>
      <option value="sarahedo">Sarah Edo</option>
      <option value="johndoe">John Doe</option>
      <option value="tylermcginnis">Tyler McGinnis</option>
    </select>
  )
}