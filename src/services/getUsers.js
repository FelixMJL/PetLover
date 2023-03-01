import axios from 'axios';

export const getUsers = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmVjMGM4NDYxZTEwYzBkOTRiMjVmMCIsImVtYWlsIjoidGhpbmthYm91dEBnbWFpbC5jb20iLCJpYXQiOjE2Nzc2Mzk5MzMsImV4cCI6MTY3NzcyNjMzM30.jDevp5fZexlC8yDhhJ3dYqkk_00zADloMMBPxTsqxJE';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get('http://localhost:4000/api/v1/users', config);
};
