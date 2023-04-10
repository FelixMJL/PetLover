import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import './ChatGPT.css';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [textLength, setTextLength] = useState(0);
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const textareaChangeHandler = (e) => {
    setResult(e.target.value);
  };
  const chatGpt = async () => {
    const response = await axios.post(
      'https://b27ifyfcv8.execute-api.us-east-1.amazonaws.com/prod/api/v1/openai/chatgpt',
      { question: input },
    );
    setResult(response.data);
  };

  useEffect(() => {
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
    <div>
      <div className="chatGPT">
        <h1>ChatGPT -- Pet related Q&A</h1>
        <input
          type="text"
          value={input}
          onChange={inputChangeHandler}
          placeholder="Please input your question"
        />
        <br />
        <br />
        <button type="button" onClick={chatGpt}>
          Submit
        </button>
        <br />
        <br />
        <textarea
          value={result.substring(0, textLength)}
          style={{ width: '500px' }}
          rows="8"
          onChange={textareaChangeHandler}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ChatGPT;
