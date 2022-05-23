import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Nav() {
  return (
    <div className="body">
      <div className="nav">
        <NavLink to="/">
          <p className="a">Home</p>
        </NavLink>
        <NavLink to="/books">
          <p className="a">Books</p>
        </NavLink>
        <NavLink to="/members">
          <p className="a">Members</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
