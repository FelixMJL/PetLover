import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrow from '../assets/left-arrow.png';
import Footer from '../components/Footer/Footer';
import { getUserData } from '../services/getUserData';
import { getUser } from '../services/getUser';
import './ImageGeneration.css';
import loading from '../assets/loading.svg';

const ImageGeneration = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [userData, setUserData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const chatImage = async () => {
    if (input === '') {
      return;
    }
    setIsLoading(true);
    const response = await axios.post(
      'https://36r2b81nr9.execute-api.us-east-1.amazonaws.com/prod/api/v1/openai/imagegeneration',
      { question: input },
      getUserData().config,
    );
    setIsLoading(false);
    setResult(response.data);
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
  }, []);

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
        <p className="descriptionTips">Start with a detailed description</p>
        <div className="descriptionContainer">
          <textarea
            value={input}
            rows="7"
            onChange={inputChangeHandler}
            placeholder="For Example: An Impressionist oil painting of sunflowers in a purple vase..."
          />
          <button type="button" onClick={chatImage} className="imageGenerationBtn">
            {isLoading ? <img src={loading} alt="loading" /> : 'Surprise me'}
          </button>
        </div>
      </div>
      <div className="resultBox">
        {result.length ? (
          <>
            <div className="resultTitle">
              <p className="resultContentJustify">RESULT</p>
              <div className="line"> </div>
            </div>
            <>
              <div className="resultContent">
                {result.map((img) => (
                  <img src={img.url} alt="" className="showResult" key={img.url} />
                ))}
              </div>
            </>
          </>
        ) : (
          <>
            <div className="resultTitle">
              <p className="resultContentJustify">EXAMPLES</p>
              <div className="line"> </div>
            </div>
            <div className="resultContent">
              <img
                // eslint-disable-next-line max-len
                src="https://cdn.openai.com/labs/images/3D%20render%20of%20a%20cute%20tropical%20fish%20in%20an%20aquarium%20on%20a%20dark%20blue%20background,%20digital%20art.webp?v=1"
                alt=""
                className="showResult"
              />
              <img
                // eslint-disable-next-line max-len
                src="https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1"
                alt=""
                className="showResult"
              />
              <img
                // eslint-disable-next-line max-len
                src="https://cdn.openai.com/labs/images/An%20expressive%20oil%20painting%20of%20a%20basketball%20player%20dunking,%20depicted%20as%20an%20explosion%20of%20a%20nebula.webp?v=1"
                alt=""
                className="showResult"
              />
              <img
                // eslint-disable-next-line max-len
                src="https://cdn.openai.com/labs/images/A%20photo%20of%20a%20white%20fur%20monster%20standing%20in%20a%20purple%20room.webp?v=1"
                alt=""
                className="showResult"
              />
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ImageGeneration;
