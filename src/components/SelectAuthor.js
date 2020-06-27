import React from 'react';

export default function SelectAuthor({ selectAuthor, handleChangeFn }) {
  return (
    <select
      className="author-name"
      value={selectAuthor}
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