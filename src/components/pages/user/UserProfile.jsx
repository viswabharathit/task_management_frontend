import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { FaUser, FaEnvelope, FaLock, FaQuestionCircle, FaSignOutAlt, FaTrashAlt, FaSave, FaEdit } from 'react-icons/fa';
import { authService } from '../../services/auth';
import { getCurrentUserId, getUserById, deleteUserById, updateUserById,updateSpecificUserById, updateUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await getUserById(userId);
          const userData = response.data;
          setUsername(userData.username);
          setEmail(userData.email);
          setContact(userData.contact);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      const updatedData = { username, email, contact, newPassword };
      console.log(updatedData);
      console.log("User ID" + userId);
      await updateUser(userId, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await deleteUserById(userId);
        authService.SignOut();
        navigate('/');
      } catch (error) {
        console.error('Failed to delete user account:', error);
      }
    }
  };

  const handleLogout = () => {
    authService.SignOut();
    navigate('/');
  };

  const handleViewHelp = () => {
    navigate('/help');
  };

  return (
    <div className='flex mt-10 justify-center items-center'>
      <div className="p-6 h-full w-5/6 bg-background text-foreground rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <section className="mb-6 flex items-center justify-between">
          <div className="flex flex-row items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">Profile</h2>
            <FaEdit
              className={`text-gray-500 ml-2 cursor-pointer ${isEditing ? 'text-blue-500' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>
          {isEditing && (
            <Button
              onClick={handleSave}
              className="bg-blue-500 text-white flex items-center"
            >
              <FaSave className="mr-2" />
              Save Changes
            </Button>
          )}
        </section>

        <div className="mb-6">
          <label className="flex items-center mb-4">
            <FaUser className="text-gray-500 mr-2" />
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="flex-1"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center mb-4">
            <FaEnvelope className="text-gray-500 mr-2" />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center mb-4">
            <FaUser className="text-gray-500 mr-2" />
            <Input
              label="Contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              className="flex-1"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center mb-4">
            <FaLock className="text-gray-500 mr-2" />
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="flex-1"
              disabled={!isEditing}
            />
          </label>
          <label className="flex items-center mb-4">
            <FaLock className="text-gray-500 mr-2" />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter a new password"
              className="flex-1"
              disabled={!isEditing}
            />
          </label>
        </div>

        <section className="mb-6">
          <label className="flex items-center mb-4">
            <Button
              onClick={handleViewHelp}
              className="bg-blue-500 text-white flex items-center"
            >
              <FaQuestionCircle className="mr-2" />
              View Help
            </Button>
          </label>
        </section>

        <section className="flex justify-between mb-6">
          <Button
            onClick={handleDeleteAccount}
            className="text-red-700 bg-transparent hover:text-red-500 hover:bg-transparent flex items-center"
          >
            <FaTrashAlt className="mr-2" />
            Delete Account
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;