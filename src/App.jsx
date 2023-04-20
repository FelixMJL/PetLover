import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
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
import Post from './views/Post';
import Comment from './views/Comment';
import Terms from './views/Terms';
import Privacy from './views/Privacy';
import Reply from './views/Reply';
import LandingPage from './views/LandingPage/LandingPage';

const App = () => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const allowedPaths = ['/signup', '/privacy', '/terms', '/team', '/login'];

    if (allowedPaths.includes(location.pathname)) {
      navigate(location.pathname);
      return;
    }

    if (!currentUser) {
      navigate('/landingPage');
      return;
    }

    const authTokenValidation = async () => {
      try {
        await authToken();
      } catch (error) {
        localStorage.clear();
        navigate('/landingPage');
      }
    };
    authTokenValidation();
  }, [navigate, location.pathname]);

  return (
    <ChakraProvider>
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
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/comment/:commentId" element={<Comment />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/reply/:replyId" element={<Reply />} />
          <Route path="/landingPage" element={<LandingPage />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
