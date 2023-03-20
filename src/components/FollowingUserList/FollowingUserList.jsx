import React from 'react';
import '../Connect/ConnectUser.css';
import loading from '../../assets/loading.svg';
import { getUserData } from '../../services/getUserData';

const FollowingUserList = ({ userType }) => {
  const btnClickHandler = () => {
    // console.log(e.target.dataset);
  };
  const userData = users;
  const currentUserId = getUserData().id;
  const currentUser = userData.find((user) => user.id === currentUserId);
  const followingIds = currentUser?.following || [];
  const filterArray = [currentUserId, ...followingIds];
  const filteredUserData = userData.filter((user) => !filterArray.includes(user.id));

  return (
    <>
      {filteredUserData.length ? (
        <>
          {filteredUserData.map((user) => (
            <div className="connect-user" key={user.username}>
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
                    onClick={btnClickHandler}
                  >
                    Follow
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

export default FollowingUserList;
