import axios from 'axios';
import { getUserData } from './getUserData';

// eslint-disable-next-line import/prefer-default-export
export const getFollowing = () =>
  axios.get(`http://localhost:8080/api/v1/posts/users/${getUserData().id}`, getUserData().config);
