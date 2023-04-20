import axios from 'axios';
import { getUserData } from './getUserData';

// eslint-disable-next-line import/prefer-default-export
export const getUserByID = () =>
  axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${getUserData().id}`,
    getUserData().config,
  );
