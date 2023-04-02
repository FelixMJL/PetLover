import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import imgURL from '../assets/logo.png';
import usernameIcon from '../assets/username.png';
import passwordIcon from '../assets/password.png';
import emailIcon from '../assets/email.png';
import nicknameIcon from '../assets/nickname.png';
import rightArrowIcon from '../assets/right-arrow.svg';
import openEye from '../assets/eye-solid.svg';
import closeEye from '../assets/eye-slash-solid.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const onChangeHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async () => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, userDetails);
    } catch (e) {
      return e.response;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userDetails.email) {
      setErrorMessage('Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      setErrorMessage('Email format error.');
      return;
    }
    if (!userDetails.password) {
      setErrorMessage('Password is required.');
      return;
    }
    if (!userDetails.username) {
      setErrorMessage('User name is required.');
      return;
    }
    if (!userDetails.nickname) {
      setErrorMessage('Nick name is required.');
      return;
    }

    addUser().then((res) => {
      if (res.status === 422) {
        setErrorMessage(
          'Password must be at least 8 characters with 1 digit, 1 uppercase letter, and 1 lowercase letter.',
        );
        setUserDetails({
          ...userDetails,
          password: '',
        });
        return;
      }
      if (res.status === 201) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        navigate('/');
      } else {
        setErrorMessage(res.data);
      }
    });
  };
  return (
    <div className="signUpBox">
      <div className="logoContainer">
        <img src={imgURL} alt="" />
      </div>
      <h2 className="welcomeTitle">Welcome to Pet Lover</h2>
      <form className="inputContainer" onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <div className="inputBox">
            <img className="icon" src={emailIcon} alt="" />
            <input
              type="email"
              name="email"
              defaultValue={userDetails.email}
              placeholder="E-mail"
              onChange={onChangeHandler}
            />
          </div>
          <div className="inputBox">
            <img className="icon" src={passwordIcon} alt="password" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              defaultValue={userDetails.password}
              onChange={onChangeHandler}
            />
            <img
              className="showPasswordIcon"
              src={showPassword ? closeEye : openEye}
              alt="Toggle password visibility"
              onClick={toggleShowPassword}
            />
          </div>
          <div className="inputBox">
            <img className="icon" src={usernameIcon} alt="" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={userDetails.username}
              onChange={onChangeHandler}
            />
          </div>
          <div className="inputBox">
            <img className="icon" src={nicknameIcon} alt="" />
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              defaultValue={userDetails.nickname}
              onChange={onChangeHandler}
            />
          </div>
          <div className="error-message">{errorMessage}</div>
        </div>
        <div className="buttonBox">
          <div className="buttonText">Create</div>
          <button type="submit">
            <img src={rightArrowIcon} alt="" />
          </button>
        </div>
      </form>
      <div className="pageSwitch">
        <span>Already have an account?</span>
        <Link className="pageSwitch-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
