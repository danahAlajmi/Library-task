import React from 'react';
import '../App.css';
// import booksStore from '../stores/booksStore';
import { Link } from 'react-router-dom';

function BookItem({ book }) {
  return (
    <div className="body">
      {' '}
      <Link style={{ textDecoration: 'none' }} to={`/books/${book.slug}`}>
        <div className="grid-item ">
          <h3>{book.title}</h3>
          <h3>{`${book.genres}`}</h3>
          <img className="bookList-image" src={book.image} />
        </div>
      </Link>
    </div>
  );
}

export default BookItem;
