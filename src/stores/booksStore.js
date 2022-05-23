import { makeObservable, observable, action } from 'mobx';
import axios from 'axios';
import membersStore from './membersStore';

class BooksStore {
  books = [];

  constructor() {
    makeObservable(this, {
      books: observable,
      fetchBooks: action,
      returnBook: action,
      borrowBook: action,
    });
  }
  membershipsLimit = {
    silver: 2,
    gold: 3,
    platinum: 5,
  };
  fetchBooks = async () => {
    try {
      const response = await axios.get(
        'https://library-borrow-system.herokuapp.com/api/books'
      );
      // console.log(response.data);

      this.books = response.data;
    } catch (error) {
      console.log('fetchBooks', error);
    }
  };

  createBook = async (book) => {
    try {
      const response = await axios.post(
        'https://library-borrow-system.herokuapp.com/api/books',
        book
      );

      this.books = [...this.books, response.data];
    } catch (error) {
      console.log('createBook', error);
    }
  };

  returnBook = async (book) => {
    try {
      const response = await axios.put(
        ` https://library-borrow-system.herokuapp.com/api/books/${
          book._id
        }/return/${book.borrowedBy[book.borrowedBy.length - 1]}`
      );
      console.log(response.data);
      // this.books = [...this.books, response.data];
      // membersStore.changeMembersBook(response.data);
      // membersStore.members = [...membersStore.members, response.data];
      console.log(membersStore.members);
      window.location.reload();
    } catch (error) {
      console.log('returnBook', error);
    }
  };

  borrowBook = async (book, memberName) => {
    const member = membersStore.members.find(
      (m) => `${m.firstName} ${m.lastName}` === memberName
    );
    if (
      (member.membership == 'silver' &&
        member.currentlyBorrowedBooks.length == this.membershipsLimit.silver) ||
      (member.membership == 'gold' &&
        member.currentlyBorrowedBooks.length == this.membershipsLimit.gold) ||
      (member.membership == 'platinum' &&
        member.currentlyBorrowedBooks.length == this.membershipsLimit.platinum)
    ) {
      alert(
        `Your reached the limit of your ${member.membership} membership of ${
          this.membershipsLimit[member.membership]
        } books`
      );
    } else {
      try {
        const response = await axios.put(
          ` https://library-borrow-system.herokuapp.com/api/books/${book._id}/borrow/${member._id}`
        );
        // this.books = [...this.books, response.data];
        membersStore.members = [...membersStore.members, response.data];
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.log('borrowBook', error);
      }
    }
  };
}

const booksStore = new BooksStore();
booksStore.fetchBooks();
export default booksStore;
