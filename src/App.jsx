import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import Login from './views/Login';
import HomePage from './views/HomePage';
import Profile from './views/Profile';
import SignUp from './views/SignUp';
import Connect from './views/Connect';
import FollowingUser from './views/FollowingUser';
import FollowingUserPosts from './views/FollowingUserPosts';
import { authToken } from './services/authToken';
import ImageGeneration from './views/ImageGeneration';
import ChatGPT from './views/ChatGPT';
import Team from './views/Team';

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
        <Route path="/followingUser/:userType" element={<FollowingUser />} />
        <Route path="/following" element={<FollowingUserPosts />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/image" element={<ImageGeneration />} />
        <Route path="/chatGpt" element={<ChatGPT />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
};

export default App;
