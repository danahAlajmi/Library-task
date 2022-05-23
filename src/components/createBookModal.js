import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import booksStore from '../stores/booksStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const checkedArr = [];

export default function CreateBookModal(props) {
  // const [checkedd, setCheckedd] = useState([]);
  const [book, setBook] = useState({
    author: '',
    title: '',
    genres: ['Fantasy'],
    image:
      'https://www.pngmart.com/files/8/Book-Cover-Transparent-Background.png',
  });
  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    booksStore.createBook(book);
    props.closeModal();
  };

  const genres = [
    'Action',
    'Fantasy',
    'Sci-Fi',
    'Romance',
    'Fiction',
    'Self-Help',
    'Thriller',
    'Suspense',
    ' Biography',
    'Business',
    'Entrepreneurship',
    'Crime',
    'Mystery',
  ];

  const handleCheck = (event) => {
    checkedArr.push(event.target.value);
    // setCheckedd(checkedd.push(event.target.value));
    setBook({ ...book, genres: checkedArr });
  };
  return (
    <Modal centered show={props.isOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>Author</InputGroup.Text>
            <Form.Control type="text" name="author" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Title</InputGroup.Text>
            <Form.Control type="text" name="title" onChange={handleChange} />
          </InputGroup>
          <br />

          <InputGroup aria-label="Select a Genre:">
            {genres.map((genre) => (
              <Form.Check
                inline
                label={genre}
                value={genre}
                name="genres"
                type="checkbox"
                onClick={handleCheck}
              />
            ))}
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>Image URL</InputGroup.Text>
            <Form.Control type="text" name="image" onChange={handleChange} />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
