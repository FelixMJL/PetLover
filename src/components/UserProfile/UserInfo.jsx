import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ExternalLinkIcon } from '@chakra-ui/icons';
import back from '../../assets/left-arrow.png';
import locationIcon from '../../assets/location.svg';
import './UserInfo.css';

const UserInfo = ({
  username,
  posts,
  nickname,
  avatar,
  followers,
  following,
  setShowEditProfile,
  introduction,
  location,
  website_url,
}) => {
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const editClickHandler = () => {
    setShowEditProfile(true);
  };

  return (
    <div className="userInfo">
      {username && (
        <div>
          <div className="headPart">
            <img className="btn btn-back" src={back} alt="back" onClick={backClickHandler} />
            <div className="userTitle">
              <p className="name">{username}</p>
              <p className="postsAmount">{posts.length} Posts</p>
            </div>
          </div>
          <div className="avatarAndEdit">
            <img src={avatar} alt="avatar" />
            <button type="button" className="edit" onClick={editClickHandler}>
              Edit Profile
            </button>
          </div>
          <div className="userDetail">
            <p className="userName">{username}</p>
            <p className="nickName">@{nickname}</p>
            {introduction && <p className="introduction">{introduction}</p>}
            <div className="moreDetails">
              {location && (
                <div className="moreDetails__location">
                  <img src={locationIcon} alt="location icon" />
                  <span>{location}</span>
                </div>
              )}
              {website_url && (
                <Link className="moreDetails__website" href={website_url} isExternal>
                  Visit Website <ExternalLinkIcon mx="2px" />
                </Link>
              )}
            </div>
            <div className="followInfo">
              <p>
                <strong>{following.length}</strong> <span>Followings</span>
              </p>
              <p>
                <strong>{followers.length}</strong> <span>Followers</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
