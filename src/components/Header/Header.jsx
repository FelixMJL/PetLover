import './Header.css';
import React, { useState, useEffect, useRef } from 'react';
import { getUser } from '../../services/getUser';
import Menu from './Menu/Menu';

const Header = () => {
  const profileMenu = useRef(null);
  const darkBackground = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const [userId, setUserId] = useState('');

  const extendMenu = () => {
    profileMenu.current.classList.add('active');
    darkBackground.current.classList.add('show');
  };

  const closeMenu = () => {
    profileMenu.current.classList.remove('active');
    darkBackground.current.classList.remove('show');
  };
  const [userData, setUserData] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    if (currentUser) {
      setUserId(currentUser.id);
    }
    const getUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="header">
      <div className="header__head">
        <img src={userData.avatar} alt="avatar" className="avatarInHeader" onClick={extendMenu} />
        <img src="" alt="logo" className="logoInHeader" />
      </div>
      <Menu
        profileMenu={profileMenu}
        closeMenu={closeMenu}
        userData={userData}
        userId={userId}
        darkBackground={darkBackground}
      />
    </div>
  );
};

export default Header;
