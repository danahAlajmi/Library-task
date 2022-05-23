import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import membersStore from '../stores/membersStore';

export default function CreateMemberModal(props) {
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    membership: 'silver',
  });
  const handleChange = (event) => {
    setMember({ ...member, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    membersStore.createMember(member);
    props.closeModal();
  };
  const memberships = ['platinum', 'silver', 'gold'];
  return (
    <Modal centered show={props.isOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>First Name</InputGroup.Text>
            <Form.Control
              type="text"
              name="firstName"
              onChange={handleChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Last Name</InputGroup.Text>
            <Form.Control type="text" name="lastName" onChange={handleChange} />
          </InputGroup>
          <br />
          {/* <InputGroup>
            <InputGroup.Text>membership</InputGroup.Text>

            <Form.Control
              type="text"
              name="membership"
              onChange={handleChange}
            />
          
          </InputGroup> */}
          {'Select a Membership:'}
          <InputGroup aria-label="Select a Membership:">
            {memberships.map((mem) => (
              <Form.Check
                inline
                label={mem}
                value={mem}
                name="membership"
                type="radio"
                onClick={handleChange}
              />
            ))}
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
