import { useNavigate, useParams, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import arrow from '../assets/left-arrow.png';
import Footer from '../components/Footer/Footer';
import FollowingUserList from '../components/FollowingUserList/FollowingUserList';
import { getUser } from '../services/getUser';
import { getAllUsers } from '../services/getAllUsers';
import './FollowingUser.css';

const FollowingUser = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  // const currentUser = JSON.parse(localStorage.getItem('userData'));
  const [userData, setUserData] = useState(0);
  // const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow

    const getUserData = async () => {
      try {
        const user = await getUser();
        const post = await getAllUsers();
        setUsers(post.data);
        setUserData(user.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getUserData();
  }, [userType]);

  const btnClickHandler = () => {
    navigate(-1);
  };
  return (
    <div className="followingUserBox">
      <div className="headerBox">
        <div className="connect-title-line">
          <div className="btn btn-back" onClick={btnClickHandler}>
            <img src={arrow} alt="left-arrow" />
          </div>
          <div className="usernameBox">
            <p className="user-menu__username">{userData.username}</p>
            <p>@{userData.nickname}</p>
          </div>
        </div>
        <div className="recommended">
          <div className="item">
            <NavLink to="/followingUser/following">Following</NavLink>
          </div>
          <div className="item">
            <NavLink to="/followingUser/follower">Followers</NavLink>
          </div>
        </div>
      </div>
      <div className="connectUsers">
        <FollowingUserList
          userType={userType}
          userIds={userType === 'following' ? userData?.following || [] : userData?.followers || []}
          users={users}
        />
      </div>
      <Footer />
    </div>
  );
};

export default FollowingUser;
