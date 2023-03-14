import React, { useState } from 'react';
import './ConnectUser.css';
import axios from 'axios';
import loading from '../../assets/loading.svg';
import { getUserData } from '../../services/getUserData';

const ConnectUser = ({ users }) => {
  const userData = users;
  const currentUserId = getUserData().id;
  const currentUser = userData.find((user) => user.id === currentUserId);
  const followingIds = currentUser?.following || [];
  const filterArray = [currentUserId, ...followingIds];
  const filteredUserData = userData.filter((user) => !filterArray.includes(user.id));

  const [isFollowing, setIsFollowing] = useState(followingIds);

  const toggleFollow = async (userId) => {
    if (isFollowing.includes(userId)) {
      setIsFollowing(isFollowing.filter((id) => id !== userId));
      await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}/unfollowing/${userId}`,
        getUserData().config,
      );
    } else {
      setIsFollowing([...isFollowing, userId]);
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}/following/${userId}`,
        null,
        getUserData().config,
      );
    }
  };
  return (
    <>
      {filteredUserData.length ? (
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
                    className="btn btn-follow"
                    data-value={user._id}
                    onClick={() => toggleFollow(user.id)}
                  >
                    {isFollowing.includes(user.id) ? 'Following' : 'Follow'}
                  </button>
                </div>
                <div className="connect-user__introduction">{user.introduction}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      )}
    </>
  );
};

export default ConnectUser;
