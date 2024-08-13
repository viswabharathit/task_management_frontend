import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authService } from '../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const checkRedirect = async () => {
    if (authService.getToken() != null && authService.isLoggedIn()) {
      const userRole = authService.getUserRole();
      if (userRole !== null) {
        if (userRole === 'PROJECTMANAGER') {
          navigate('/manager');
        } else if (userRole === 'TEAMMEMBER') {
          navigate('/alltasks');
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  useEffect(() => {
    checkRedirect();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.SignIn(email.current.value, password.current.value);
      if (res.status === 200) {
        console.log(res);
        authService.setToken(res.data); // Adjust based on your actual response structure
        toast.success("Hello again!!");

        setTimeout(() => {
          checkRedirect();
        }, 3000);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error('Error in setting up request');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-1/3 border-2 border-gray-500 rounded-2xl p-10 bg-black">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Login Form</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "  />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              ref={email}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all hover:border-green-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              ref={password}
              className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all hover:border-green-500"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
            Log In
          </button>
          <p className="text-center text-gray-400 text-sm">By clicking this you agree to our terms and policies</p>
          <Link to="/register" className="w-full block text-center bg-gray-500 text-white py-2 rounded-md">
            Create Account
          </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
