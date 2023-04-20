import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrow from '../assets/left-arrow.png';
import Footer from '../components/Footer/Footer';
import { getUser } from '../services/getUser';
import './ImageGeneration.css';
import loading from '../assets/loading.svg';
import './ChatGPT.css';

const ImageGeneration = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [textLength, setTextLength] = useState(0);

  const [userData, setUserData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const textareaChangeHandler = (e) => {
    setResult(e.target.value);
  };
  const chatGpt = async () => {
    if (input === '') {
      return;
    }
    setIsLoading(true);
    const response = await axios.post(
      'https://b27ifyfcv8.execute-api.us-east-1.amazonaws.com/prod/api/v1/openai/chatgpt',
      { question: input },
    );
    setResult(response.data);
    setIsLoading(false);
  };

  const btnClickHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getUserInfo();
    setTextLength(0);
    const interval = setInterval(() => {
      setTextLength((prevTextLength) => {
        if (prevTextLength < result.length) {
          return prevTextLength + 1;
        }
        return prevTextLength;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [result]);

  return (
    <div className="imageGenerationBox">
      <div className="headerBox">
        <div className="connect-title-line">
          <div className="btn btn-back" onClick={btnClickHandler}>
            <img src={arrow} alt="left-arrow" />
          </div>
          <div className="usernameBox">
            <p className="user-menu__username">{userData.nickname}</p>
            <p>@{userData.username}</p>
          </div>
        </div>
      </div>
      <div className="descriptionBox">
        <p className="descriptionTips">ChatGPT -- Pet related Q&A</p>
        <div className="descriptionContainer">
          <textarea
            value={input}
            rows="7"
            onChange={inputChangeHandler}
            placeholder="What is the average lifespan of a dog?"
          />
          <button type="button" onClick={chatGpt} className="imageGenerationBtn">
            {isLoading ? <img src={loading} alt="loading" /> : 'Answer me'}
          </button>
        </div>
      </div>
      <div className="resultBox">
        <div className="resultTitle">
          <p className="resultContentJustify">RESULT</p>
          <div className="line"> </div>
        </div>
        {result.length && (
          <textarea
            className="chatGPT__result"
            value={result.substring(0, textLength)}
            rows="8"
            onChange={textareaChangeHandler}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ImageGeneration;
