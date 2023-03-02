import './ConnectUsers.css';
import { getUsers } from '../../services/getUsers';
import { useEffect, useState } from 'react';
import ConnectUser from './ConnectUser';

const ConnectUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="connect-users">
      <ConnectUser users={users} />
    </div>
  );
};

export default ConnectUsers;
