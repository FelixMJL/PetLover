import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import Login from './views/Login';
import HomePage from './views/HomePage';
import Profile from './views/Profile';
import SignUp from './views/SignUp';
import Connect from './views/Connect';
import Following from './views/Following';
import FollowingUser from './views/FollowingUser';
import { authToken } from './services/authToken';

const App = () => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/signup') {
      navigate('/signup');
      return;
    }
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const authTokenValidation = async () => {
      try {
        await authToken();
      } catch (error) {
        localStorage.clear();
        navigate('/login');
      }
    };
    authTokenValidation();
  }, [currentUser, location.pathname, navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/following" element={<Following />} />
        <Route path="/followingUser/:userType" element={<FollowingUser />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </div>
  );
};

export default App;
