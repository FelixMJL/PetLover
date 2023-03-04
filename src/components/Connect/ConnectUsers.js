import './ConnectUsers.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConnectUser from './ConnectUser';
import arrow from './../../assets/left-arrow.png';
import {getAllUsers} from "../../services/getAllUsers";

const ConnectUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      const getUsersData = async () => {
          try {
              const post = await getAllUsers();
              setUsers(post.data);
          } catch (error) {
              console.log(error.message);
          }
      };
      getUsersData();
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
