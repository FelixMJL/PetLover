import './UserPosts.css';
import moment from 'moment';
import React from 'react';
import MyPost from './post/myPost';
import bin from '../../assets/bin.png';

// eslint-disable-next-line camelcase
const UserPosts = ({ posts, username, nickname, avatar, created_at, id, currentUserId }) => (
  <div className="userPosts">
    {posts &&
      posts.map((post) => (
        <div key={post._id} className="postItem">
          <div className="postItemContainer">
            <div className="postAvatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="postContentContainer">
              <div className="postContent">
                <div className="postInfo">
                  <span className="userName">{username}</span>
                  <span>@{nickname}</span>
                  <span className="separatingDot">.</span>
                  <span className="timeFromNow">{moment({ created_at }).fromNow()}</span>
                </div>
                <div>
                  <span className="bin">
                    {id === currentUserId ? <img src={bin} alt="" /> : ''}
                  </span>
                </div>
              </div>
              <MyPost {...post} />
            </div>
          </div>
        </div>
      ))}
  </div>
);

export default UserPosts;
