import axios from 'axios';
import { getUserData } from './getUserData';

// eslint-disable-next-line import/prefer-default-export
export const getUserByID = () =>
  axios.get(`http://localhost:8080/api/v1/users/${getUserData().id}`, getUserData().config);
