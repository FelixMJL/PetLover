import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import arrow from '../assets/left-arrow.png';
import Footer from '../components/Footer/Footer';
//import FollowingUserList from '../components/FollowingUserList/FollowingUserList';
import { getUser } from '../services/getUser';

const FollowingUser = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  // const currentUser = JSON.parse(localStorage.getItem('userData'));
  const [userData, setUserData] = useState(0);
  // const [userId, setUserId] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-shadow

    const getUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
        // eslint-disable-next-line no-console
        console.log(userData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  const btnClickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="followingUserBox">
      <div className="recommend">
        <div className="connect-title-line">
          <div className="btn btn-back" onClick={btnClickHandler}>
            <img src={arrow} alt="left-arrow" />
          </div>
          <p className="user-menu__username">{userData.username}</p>
          <p>@{userData.nickname}</p>
        </div>
        <div className="item">
          {userType === ':following' ? <div>Following</div> : <div>Followers</div>}
        </div>
        <div className="item">
          {userType === ':follower' ? <div>Following</div> : <div>Followers</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FollowingUser;
