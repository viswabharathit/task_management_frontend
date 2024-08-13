import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Users } from 'lucide-react';
import { registerProjectManager,registerTeamMember } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    role: 'TEAMMEMBER',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (!formData.contact) formErrors.contact = 'Contact is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      if (formData.role === 'TEAMMEMBER') {
        await registerTeamMember(formData.name, formData.email, formData.password, formData.contact, formData.role);
      } else if (formData.role === 'PROJECTMANAGER') {
        await registerProjectManager(formData.name, formData.email, formData.password, formData.contact, formData.role);
      }
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response : error.message);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      setErrors({ submit: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-black p-8 rounded-lg border border-gray-800">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative ">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border-b-2 border-gray-400 bg-transparent text-white w-full py-2 pl-10 focus:border-green-500 focus:outline-none"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div className="mb-6 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-2 border-gray-400 bg-transparent text-white w-full py-2 pl-10 focus:border-green-500 focus:outline-none"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-6 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-b-2 border-gray-400 bg-transparent text-white w-full py-2 pl-10 focus:border-green-500 focus:outline-none"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="mb-6 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              className="border-b-2 border-gray-400 bg-transparent text-white w-full py-2 pl-10 focus:border-green-500 focus:outline-none"
            />
            {errors.contact && <span className="text-red-500 text-sm">{errors.contact}</span>}
          </div>
          <div className="mb-4 relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-b-2 border-gray-400 bg-transparent text-white w-full py-2 pl-10 focus:border-green-500 focus:outline-none"
            >
              <option value="TEAMMEMBER">TEAM MEMBER</option>
              <option value="PROJECTMANAGER">PROJECT MANAGER</option>
            </select>
          </div>
          {errors.submit && <span className="text-red-500 text-sm">{errors.submit}</span>}
          <div className="flex flex-col items-center mt-6 ">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded w-full mb-4"
            >
              Register
            </button>
            <div className="flex items-center">
              <span className="text-white text-sm ml-2 p-2">Already registered?</span>
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-6 rounded"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
