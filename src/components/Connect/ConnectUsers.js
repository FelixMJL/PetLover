import './ConnectUsers.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConnectUser from './ConnectUser';
import axios from 'axios';
import arrow from './../../assets/left-arrow.png';

const ConnectUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmVjMGM4NDYxZTEwYzBkOTRiMjVmMCIsImVtYWlsIjoidGhpbmthYm91dEBnbWFpbC5jb20iLCJpYXQiOjE2Nzc4OTYxOTcsImV4cCI6MTY3Nzk4MjU5N30.RrdT0P8TILoW7OGeJqLQ0dR_VFrMGQU5qKTrDRmBsUo';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get('http://localhost:4000/api/v1/users', config);
  };

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

  const navigate = useNavigate();
  const btnClickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="connect-section">
      <div>
        <div className="connect-title-line">
          <div className="btn btn-back" onClick={btnClickHandler}>
            <img src={arrow} alt="left-arrow"></img>
          </div>
          <span id="connect-title">Connect</span>
        </div>
      </div>
      <div>
        <div id="connect-subtitle">Suggested for you</div>
      </div>

      <div className="connect-users">
        <ConnectUser users={users} />
      </div>
    </div>
  );
};

export default ConnectUsers;
