import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import { getUserData } from '../services/getUserData';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const textareaChangeHandler = (e) => {
    setResult(e.target.value);
  };
  const chatGpt = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/openai/chatGpt`,
      { question: input },
      getUserData().config,
    );
    setResult(response.data);
  };

  return (
    <div>
      <h1>chatgpt</h1>
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
        value={result}
        style={{ width: '500px' }}
        rows="8"
        onChange={textareaChangeHandler}
      />
      <Footer />
    </div>
  );
};

export default ChatGPT;
