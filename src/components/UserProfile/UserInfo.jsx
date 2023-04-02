import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ExternalLinkIcon } from '@chakra-ui/icons';
import back from '../../assets/left-arrow.png';
import locationIcon from '../../assets/location.svg';
import './UserInfo.css';
import { getUserData } from '../../services/getUserData';

const UserInfo = ({
  id,
  username,
  posts,
  updatedNickname,
  updatedAvatar,
  followers,
  following,
  setShowEditProfile,
  updatedIntroduction,
  updatedLocation,
  updatedWebsiteUrl,
  isFollowing,
  isCurrentUser,
  setIsFollowing,
}) => {
  const currentUserId = getUserData().id;
  const navigate = useNavigate();
  const backClickHandler = () => {
    navigate(-1);
  };
  const editClickHandler = () => {
    setShowEditProfile(true);
  };
  const unfollow = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}/unfollowing/${id}`,
      getUserData().config,
    );
    setIsFollowing(false);
  };
  const follow = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}/following/${id}`,
      null,
      getUserData().config,
    );
    setIsFollowing(true);
  };
  return (
    <div className="userInfo">
      {username && (
        <div>
          <div className="headPart">
            <img className="btn btn-back" src={back} alt="back" onClick={backClickHandler} />
            <div className="userTitle">
              <p className="name">{updatedNickname}</p>
              <p className="postsAmount">{posts.length} Posts</p>
            </div>
          </div>
          <div className="avatarAndEdit">
            <img src={updatedAvatar} alt="avatar" />
            {/* eslint-disable-next-line no-nested-ternary */}
            {isCurrentUser ? (
              <button type="button" className="edit" onClick={editClickHandler}>
                Edit Profile
              </button>
            ) : isFollowing ? (
              <button type="button" className="edit" onClick={unfollow}>
                Following
              </button>
            ) : (
              <button type="button" className="edit edit-follow" onClick={follow}>
                Follow
              </button>
            )}
          </div>
          <div className="userDetail">
            <p className="userName">{updatedNickname}</p>
            <p className="nickName">@{username}</p>
            {updatedIntroduction && <p className="introduction">{updatedIntroduction}</p>}
            <div className="moreDetails">
              {updatedLocation && (
                <div className="moreDetails__location">
                  <img src={locationIcon} alt="location icon" />
                  <span>{updatedLocation}</span>
                </div>
              )}
              {updatedWebsiteUrl && (
                <Link className="moreDetails__website" href={updatedWebsiteUrl} isExternal>
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
