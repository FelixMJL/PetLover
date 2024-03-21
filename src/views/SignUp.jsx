import React, { useEffect, useState } from 'react';
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
import postIcon from '../assets/post.svg';
import connectIcon from '../assets/friends.svg';
import openAI from '../assets/openAI.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isVideoVisible = windowWidth > 450;
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
    <div className="signUpBox signup">
      {isVideoVisible && (
        <video
          className="videoBackground"
          src="https://dev-petlover.s3.ap-southeast-2.amazonaws.com/videos/dog.mp4"
          autoPlay
          loop
          muted
        />
      )}
      <div className="signUpBox__des">
        <h1 className="signUpBox__des-title">Join the club</h1>
        <h3 className="signUpBox__des-subtitle">A Dedicated Platform for Pet Enthusiasts</h3>
        <ul className="signUpBox__des-list">
          <li className="signUpBox__des-li">
            <div className="signUpBox__postIcon-wrapper">
              <img className="signUpBox__postIcon" src={postIcon} alt="post" />
            </div>
            <div>
              <h4>Post</h4>
              <p>Share your pet stories</p>
            </div>
          </li>
          <li className="signUpBox__des-li">
            <div className="signUpBox__postIcon-wrapper">
              <img className="signUpBox__postIcon" src={connectIcon} alt="connect" />
            </div>
            <div>
              <h4>Connect</h4>
              <p>Make friends with pet owners</p>
            </div>
          </li>
          <li className="signUpBox__des-li">
            <div className="signUpBox__postIcon-wrapper">
              <img className="signUpBox__postIcon" src={openAI} alt="openAI" />
            </div>
            <div>
              <h4>OpenAI</h4>
              <p>Using AI solve your problem</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="signUpBox__container signup__container">
        <div className="logoContainer signup__logoContainer">
          <img src={imgURL} alt="" />
        </div>
        <h2 className="welcomeTitle signup__welcomeTitle">Welcome to Pet Lover</h2>
        <form className="inputContainer signup__inputContainer" onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <div className="inputBox signup__inputBox">
              <img className="icon" src={emailIcon} alt="" />
              <input
                type="email"
                name="email"
                defaultValue={userDetails.email}
                placeholder="E-mail"
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputBox signup__inputBox">
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
            <div className="inputBox signup__inputBox">
              <img className="icon" src={usernameIcon} alt="" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                defaultValue={userDetails.username}
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputBox signup__inputBox">
              <img className="icon" src={nicknameIcon} alt="" />
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                defaultValue={userDetails.nickname}
                onChange={onChangeHandler}
              />
            </div>
            <div className="error-message signup__error-message">{errorMessage}</div>
            <div className="buttonBox signup__buttonBox">
              <div className="buttonText">Create</div>
              <button type="submit" className="">
                <img src={rightArrowIcon} alt="" />
              </button>
            </div>
          </div>
        </form>
        <div className="pageSwitch signup__pageSwitch">
          <span>Already have an account?</span>
          <Link className="pageSwitch-link" to="/login">
            Login
          </Link>
        </div>
        <br />
        <div className="displayClom">
          <span>By signing up, you agree to the </span>
          <Link className="pageSwitch-link" to="/terms">
            Terms and Conditions
          </Link>
          <span> and </span>
          <Link className="pageSwitch-link" to="/privacy">
            Privacy Policy.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
