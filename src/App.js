import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import Login from './views/Login';
import HomePage from './views/HomePage';
import Profile from './views/Profile';
import SignUp from './views/SignUp';
import Connect from './views/Connect';
import Following from './views/Following';
import { authToken } from './services/authToken';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authTokenValidation = async () => {
      try {
        await authToken();
      } catch (error) {
        localStorage.clear();
        navigate('/login');
      }
    };
    authTokenValidation();
  }, [navigate]);

    return (
        <div className="app">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/following" element={<Following />} />
                    <Route path="/connect" element={<Connect />} />
                </Routes>
        </div>
    );
}

export default App;
