import React, { useState } from 'react';
import { Trash, Edit, Plus } from 'lucide-react';
import '../../../assets/css/members.css';

const Members = () => {
  const initialUsers = [
    { id: 1, username: 'viswa', role: 'Data Analyst' },
    { id: 2, username: 'bharathi', role: 'Machine Vision' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ id: '', username: '', role: '' });

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowEditPopup(true);
  };

  const handleDeleteClick = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    setShowEditPopup(false);
  };

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setShowAddPopup(false);
    setNewUser({ id: '', username: '', role: '' });
  };

  return (
    <div className='members-container'>
      <h1 className='members-title'>Members</h1>
      <table className='members-table'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditClick(user)} className='mr-4'><Edit size={20} /></button>
                <button onClick={() => handleDeleteClick(user.id)}><Trash size={20} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='add-button' onClick={handleAddClick}>
        <Plus size={20} /> Add User
      </button>

      {showEditPopup && (
        <div className='overlay'>
          <div className='popup'>
            <h2>Edit User</h2>
            <input
              type='text'
              placeholder='Username'
              value={currentUser.username}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
            />
            <input
              type='text'
              placeholder='Role'
              value={currentUser.role}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            />
            <button className='confirm-button' onClick={handleSaveEdit}>Save</button>
            <button className='cancel-button' onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className='overlay'>
          <div className='popup'>
            <h2>Add User</h2>
            <input
              type='text'
              placeholder='Username'
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type='text'
              placeholder='Role'
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <button className='confirm-button' onClick={handleAddUser}>Add</button>
            <button className='cancel-button' onClick={() => setShowAddPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
