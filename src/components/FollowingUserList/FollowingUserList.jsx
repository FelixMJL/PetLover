/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import '../Connect/ConnectUser.css';
import './FollowingUserList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loading from '../../assets/loading.svg';
import { getUserData } from '../../services/getUserData';
import Popup from '../Connect/Popup';
import followersLooking from '../../assets/looking_for_followers.webp';

const FollowingUserList = ({ userType, userIds, users }) => {
  const userData = users;
  const currentUserId = getUserData().id;

  const filteredUserData = userData.filter((user) => userIds.includes(user.id));
  const [isFollowing, setIsFollowing] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [count, setCount] = useState(0);
  const selectedUser = userData.find((user) => user.id === selectedUserId);
  const [status, setStatus] = useState(loading);

  useEffect(() => {
    if (userType === ':following') {
      setCount(count + 1);
      setIsFollowing(userIds);
    }
    if (!filteredUserData.length) {
      setStatus('no-posts');
    } else {
      setStatus('posts');
    }
  }, [userIds]);

  const toggleFollow = async (userId) => {
    if (isFollowing.includes(userId)) {
      setSelectedUserId(userId);
      setShowPopup(true);
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}/following/${userId}`,
          null,
          getUserData().config,
        )
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error:', error);
        });
      setIsFollowing([...isFollowing, userId]);
    }
  };

  const handleConfirm = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}/unfollowing/${selectedUserId}`,
        getUserData().config,
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
      });
    setIsFollowing(isFollowing.filter((id) => id !== selectedUserId));
    setSelectedUserId(null);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setSelectedUserId(null);
    setShowPopup(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <>
      {status === loading ? (
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      ) : filteredUserData.length ? (
        <>
          {filteredUserData.map((user) => (
            <div className="connect-user" key={user.id}>
              <div className="connect-user__avatar">
                <img className="connect-user__avatar--img" src={user.avatar} alt="avatar" />
              </div>
              <div className="connect-user__description">
                <div className="connect-user__description--top">
                  <div className="connect-user__description--name">
                    <div className="connect-user__nickname">{user.nickname}</div>
                    <div className="connect-user__username">@{user.username}</div>
                  </div>
                  {/* eslint-disable-next-line react/button-has-type */}
                  <button
                    className={`btn btn-follow `}
                    data-value={user._id}
                    onClick={() => toggleFollow(user.id)}
                    // onMouseEnter={() => handleMouseEnter(user.id)}
                    // onMouseLeave={() => handleMouseLeave(user.id)}
                  >
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {isFollowing.includes(user.id) ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
                <div className="connect-user__introduction">{user.introduction}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="following-error-message_wrapper">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {userType === ':following' ? (
            <>
              <p>Be in the Know</p>
              <p className="following-errorMessage">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Following accounts is an easy way to create your timeline and know what's happening
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                with the topics and people you're interested in.
              </p>
              <Link to="/connect">Find people to follow</Link>
            </>
          ) : (
            <>
              <img src={followersLooking} alt="" className="errorImg" />
              <p>Looking for followers</p>
              <p className="following-errorMessage">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                When someone follows this account, they'll show up here. Posting and interacting
                with others helps boost followers
              </p>
            </>
          )}
        </div>
      )}
      <Popup
        show={showPopup}
        username={selectedUser?.username}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default FollowingUserList;
