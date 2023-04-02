import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const authToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/auth`, userData);
};
