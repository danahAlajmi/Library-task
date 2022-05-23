import React, { useState } from 'react';
import booksStore from '../stores/booksStore';
import membersStore from '../stores/membersStore';
import '../App.css';
import { observer } from 'mobx-react';

import { useParams, Navigate } from 'react-router-dom';

function BookDetails() {
  let returnBtnClass = 'return-btn';
  let borrowBtnClass = 'borrow-btn';
  let selectClass = 'select';
  let memberText = 'show';

  const [member, setMember] = useState('');
  // booksStore.fetchBooks();
  const { bookSlug } = useParams();
  // console.log('bookslug', bookSlug);
  const book = booksStore.books.find((book) => {
    // console.log(book.slug);
    return book.slug === bookSlug;
  });
  const handleSubmit = (event, func) => {
    // event.preventDefault();
    // returnBtnClass = 'return-btn';
    func();
  };
  // console.log('book', book);
  let view;
  if (book === undefined) {
    return <h1>loading...</h1>;
  } else {
    let bookCurrentlyBorrowedByMemberID = 0;
    let bookCurrentlyBorrowedByMemberFirstName = 'No';
    let bookCurrentlyBorrowedByMemberLastName = 'One';
    if (book.available === false) {
      bookCurrentlyBorrowedByMemberID =
        book.borrowedBy[book.borrowedBy.length - 1];
      bookCurrentlyBorrowedByMemberFirstName = membersStore.members.find(
        (member) => member._id === bookCurrentlyBorrowedByMemberID
      ).firstName;
      bookCurrentlyBorrowedByMemberLastName = membersStore.members.find(
        (member) => member._id === bookCurrentlyBorrowedByMemberID
      ).lastName;
    }
    // console.log(book, bookSlug, booksStore.books);

    booksStore.books.forEach((book) => {
      // console.log(book._id, book.slug);
    });

    if (book.available === true) {
      returnBtnClass = 'hide';
    }
    if (book.available === false) {
      borrowBtnClass = 'hide';
      selectClass = 'hide';
      memberText = 'hide';
    }
    return (
      <div className="textt body">
        <h3>{`Author: ${book.author} `}</h3>
        <h3>{`title: ${book.title}`}</h3>
        <h3>{`Genres: ${book.genres}`}</h3>
        <h3>{`Currently Borrowed By: ${bookCurrentlyBorrowedByMemberFirstName} ${bookCurrentlyBorrowedByMemberLastName}`}</h3>
        <br />
        <img className="bookDetails-image" src={book.image} />
        <div className="borrow-return">
          <div className="borrow-member">
            <div>
              <label>
                <h3 className={memberText}>Member:</h3>
              </label>
              <br />
              <select
                onChange={(e) => setMember(e.target.value)}
                className={selectClass}
              >
                <option>Select a Member</option>
                {membersStore.members.map((member) => (
                  <option
                    value={`${member.firstName} ${member.lastName}`}
                  >{`${member.firstName} ${member.lastName}`}</option>
                ))}
              </select>
              <br />
              <button
                className={borrowBtnClass}
                onClick={(e) =>
                  handleSubmit(e, booksStore.borrowBook(book, member))
                }
              >
                Borrow
              </button>
              <br />
              <button
                className={returnBtnClass}
                onClick={(e) => handleSubmit(e, booksStore.returnBook(book))}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default observer(BookDetails);
