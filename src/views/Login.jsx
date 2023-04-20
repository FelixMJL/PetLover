import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import imgURL from '../assets/logo.png';
import passwordIcon from '../assets/password.png';
import emailIcon from '../assets/email.png';
import rightArrowIcon from '../assets/right-arrow.svg';
import openEye from '../assets/eye-solid.svg';
import closeEye from '../assets/eye-slash-solid.svg';
import postIcon from '../assets/post.svg';
import connectIcon from '../assets/friends.svg';
import openAI from '../assets/openAI.svg';

const Login = () => {
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
    setErrorMessage('');
  };

  const verifyUser = async () => {
    try {
      return await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/login`, {
        ...userDetails,
      });
    } catch (e) {
      return e.response;
    }
  };

  const login = (event) => {
    event.preventDefault();
    if (!userDetails.email) {
      setErrorMessage('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      setErrorMessage('Email is invalid');
      return;
    }
    if (!userDetails.password) {
      setErrorMessage('Password is required');
      return;
    }

    verifyUser().then((res) => {
      if (res.status === 404) {
        setErrorMessage('This email does not exist');
        return;
      }
      if (res.status === 401) {
        setErrorMessage('Invalid email or password');
        return;
      }
      if (res.status === 201) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        navigate('/');
      }
    });
  };

  return (
    <div className="signUpBox">
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
      <div className="signUpBox__container">
        <div className="logoContainer">
          <img src={imgURL} alt="" />
        </div>
        <h2 className="welcomeTitle">Welcome to Pet Lover</h2>
        <form className="inputContainer" onSubmit={login}>
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

            <div className="error-message">{errorMessage}</div>
          </div>
          <div className="buttonBox">
            <div className="buttonText">Sign in</div>
            <button type="submit">
              <img src={rightArrowIcon} alt="" />
            </button>
          </div>
        </form>
        <div className="pageSwitch">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span>Don't have an account?</span>
          <Link className="pageSwitch-link" to="/signup">
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
