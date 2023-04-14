import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import closePageIcon from '../../../assets/icon-close.png';
import profileIcon from '../../../assets/icon-profile.png';
import logoutIcon from '../../../assets/icon-logout.png';
import chatGpt from '../../../assets/chatGPT.svg';
import imageGeneration from '../../../assets/openai-image.svg';
import team from '../../../assets/team.svg';
import privacy from '../../../assets/privacy.svg';
import terms from '../../../assets/terms.svg';

const Menu = ({ profileMenu, closeMenu, userData, userId, darkBackground }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <div>
      <div className="profileMenu" ref={profileMenu}>
        <div className="profileMenuHeader">
          <h4>Account info</h4>
          <button type="button" className="closeProfileMenu" onClick={closeMenu}>
            <img src={closePageIcon} alt="Close page icon" />
          </button>
        </div>

        <div>
          {userData && (
            <div className="user-menu">
              <div>
                <img src={userData.avatar} alt="avatar" className="user-menu__avatar" />
              </div>
              <p className="user-menu__username">{userData.nickname}</p>
              <p>@{userData.username}</p>
              <div className="aboutFollowOfUser">
                <NavLink className="nav-link" to="/followingUser/following">
                  <p>
                    <b>{userData.following.length}</b> Followings
                  </p>
                </NavLink>
                <NavLink className="nav-link" to="/followingUser/follower">
                  <p>
                    <b>{userData.followers.length}</b> Followers
                  </p>
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="user-menu__profile-list">
          {userId ? (
            <Link className="user-menu__profile-list-items" to={`/profile/${userId}`}>
              <img src={profileIcon} alt="Profile icon" />
              Profile
            </Link>
          ) : (
            ''
          )}
          <Link className="user-menu__profile-list-items" to="/chatGPT">
            <img src={chatGpt} alt="chatGpt" />
            ChatGpt
          </Link>
          <Link className="user-menu__profile-list-items" to="/image">
            <img src={imageGeneration} alt="imageGeneration" />
            Image Generation
          </Link>

          <Link className="user-menu__logoutBtn terms" to="/terms">
            <img src={terms} alt="terms and conditions" />
            Terms and Conditions
          </Link>
          <Link className="user-menu__logoutBtn privacy" to="/privacy">
            <img src={privacy} alt="privacy policy" />
            Privacy Policy
          </Link>
          <Link className="user-menu__logoutBtn team" to="/team">
            <img src={team} alt="our tem" />
            About Our Team
          </Link>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="user-menu__logoutBtn" onClick={logout}>
            <img src={logoutIcon} alt="Logout icon" /> Logout
          </button>
        </div>
      </div>
      <div ref={darkBackground} className="darkBackground" />
    </div>
  );
};

export default Menu;
