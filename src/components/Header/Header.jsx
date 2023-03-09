import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { getUser } from "../../services/getUser";
import profileIcon from "../../assets/icon-profile.png";
import logoutIcon from "../../assets/icon-logout.png";
import closePageIcon from "../../assets/icon-close.png";

const Header = () => {
  const profileMenu = useRef(null);
  const darkBackground = useRef(null);

  const extendMenu = () => {
    profileMenu.current.classList.add("active");
    darkBackground.current.classList.add("show");
  };

  const closeMenu = () => {
    profileMenu.current.classList.remove("active");
    darkBackground.current.classList.remove("show");
  };
  const [userData, setUserData] = useState(0);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="header">
      <div className="header__head">
        <img
          src={userData.avatar}
          alt="avatar"
          className="avatarInHeader"
          onClick={extendMenu}
        />
        <img src="" alt="logo" className="logoInHeader" />
      </div>
      <div className="profileMenu" ref={profileMenu}>
        <div className="profileMenuHeader">
          <h4>Account info</h4>
          <button className="closeProfileMenu" onClick={closeMenu}>
            <img src={closePageIcon} alt="Close page icon" />
          </button>
        </div>

        <div>
          {userData && (
            <div className="user-menu">
              <div>
                <img
                  src={userData.avatar}
                  alt="avatar"
                  className="user-menu__avatar"
                ></img>
              </div>
              <p className="user-menu__username">{userData.username}</p>
              <p>@{userData.nickname}</p>
              <div className="aboutFollowOfUser">
                <p>
                  <b>{userData.following.length}</b> Followings
                </p>
                <p>
                  <b>{userData.followers.length}</b> Followers
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="user-menu__profile-list">
          <div className="user-menu__profile-list-items">
            <img src={profileIcon} alt="Profile icon" /> Profile
          </div>
          <button className="user-menu__logoutBtn" onClick={""}>
            <img src={logoutIcon} alt="Logout icon" /> Logout
          </button>
        </div>
      </div>
      <div ref={darkBackground} className="darkBackground"></div>
    </div>
  );
};

export default Header;
