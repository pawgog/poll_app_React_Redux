import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
          <span> / </span>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New Poll
          </NavLink>
          <span> / </span>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Authors Rank
          </NavLink>
          <span> / </span>
        </li>
      </ul>
    </nav>
  );
}
