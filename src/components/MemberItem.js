import React from 'react';
import '../App.css';
import booksStore from '../stores/booksStore';
import { Link } from 'react-router-dom';

function MemberItem({ member }) {
  const cbb = [];

  return (
    <Link style={{ textDecoration: 'none' }} to={`/members/${member.slug}`}>
      <div className="grid-item">
        <p>{`${member.firstName} ${member.lastName}`}</p>
      </div>
    </Link>
  );
}

export default MemberItem;
