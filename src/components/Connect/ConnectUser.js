import React, { useState } from 'react';
import './ConnectUser.css';
import axios from 'axios';
import loading from '../../assets/loading.svg';
import { getUserData } from '../../services/getUserData';
import Popup from './Popup';

const ConnectUser = ({ users }) => {
  const userData = users;
  const currentUserId = getUserData().id;
  const currentUser = userData.find((user) => user.id === currentUserId);
  const followingIds = currentUser?.following || [];
  const filterArray = [currentUserId, ...followingIds];
  const filteredUserData = userData.filter((user) => !filterArray.includes(user.id));

  const [isFollowing, setIsFollowing] = useState(followingIds);
  const [showUnfollow, setShowUnfollow] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const selectedUser = userData.find((user) => user.id === selectedUserId);

  const handleMouseEnter = (userId) => {
    if (isFollowing.includes(userId)) {
      setShowUnfollow((prev) => [...prev, userId]);
    }
  };

  const handleMouseLeave = (userId) => {
    setShowUnfollow((prev) => prev.filter((id) => id !== userId));
  };

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
                    className={`btn btn-follow  ${
                      isFollowing.includes(user.id) ? 'following ' : ''
                    }${
                      isFollowing.includes(user.id) && showUnfollow.includes(user.id)
                        ? 'unfollow'
                        : ''
                    }`}
                    data-value={user._id}
                    onClick={() => toggleFollow(user.id)}
                    onMouseEnter={() => handleMouseEnter(user.id)}
                    onMouseLeave={() => handleMouseLeave(user.id)}
                  >
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {isFollowing.includes(user.id)
                      ? showUnfollow.includes(user.id)
                        ? 'Unfollow'
                        : 'Following'
                      : 'Follow'}
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
      <Popup
        show={showPopup}
        username={selectedUser?.username}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </>
  );
};
export default ConnectUser;
