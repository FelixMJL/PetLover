import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const authToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return axios.post('http://localhost:8080/api/v1/auth', userData);
};
