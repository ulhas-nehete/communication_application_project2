import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const UserList = () => {
  const [users, setUsers] = useState(getUsersFromLocalStorage);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleEdit = (index) => {
    setEditingUser({ ...users[index], index });
    setShowEditModal(true);
    setMessage('');
  };

  const handleSaveEdit = () => {

    // Name validation
    if (!editingUser.fullname) {
      setMessage('Full name is required');
      return;
    }

    // Email validation 
    if (!editingUser.email) {
      setMessage('Please enter email');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editingUser.email)) {
      setMessage('Please enter a valid email');
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[editingUser.index] = { ...editingUser };
    setUsers(updatedUsers);
    setEditingUser(null);
    setShowEditModal(false);
  };

  // user delete
  const handleDelete = (index) => {
    setUserToDelete(index);
    setShowDeleteModal(true);
  };

  // user confirm delete
  const confirmDelete = () => {
    const updatedUsers = users.filter((_, i) => i !== userToDelete);
    setUsers(updatedUsers);
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <h1 className="pageHeader">Users</h1>
      <table id="userList" className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th width="40%">Name</th>
            <th className="text-center">User Email ID</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.fullname}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">
                <Button variant="link" onClick={() => handleEdit(index)} > Edit </Button>
                <span className="divider"> | </span>
                <Button variant="link" onClick={() => handleDelete(index)} disabled={user.email === loggedInUser.email} > Delete </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullname" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" value={editingUser?.fullname || ''} onChange={(e) => setEditingUser({ ...editingUser, fullname: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={editingUser?.email || ''} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} disabled={editingUser?.email === loggedInUser.email} />
            </Form.Group>
          </Form>
          {message && <span className="error">{message}</span>}
          <div className="mt-3">
            <Button variant="default" onClick={handleSaveEdit}>Save</Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong className="d-block p-3 text-center">Are you sure?</strong>
          <div className="mt-3 text-center">
            <Button variant="default" className="me-2" onClick={confirmDelete}>Ok</Button>
            <Button variant="default" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserList;
