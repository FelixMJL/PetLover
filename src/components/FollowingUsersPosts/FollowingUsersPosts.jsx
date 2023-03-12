import React, { useState, useEffect } from 'react';
import './FollowingUsersPosts.css';
import moment from 'moment';
import reply from '../../assets/reply.png';
import { getFollowing } from '../../services/getFollowing';
import loading from '../../assets/loading.svg';

const FollowingUsersPosts = () => {
  const [postData, setPostData] = useState([]);
  const [status, setStatus] = useState(loading);
  useEffect(() => {
    const getPostData = async () => {
      const post = await getFollowing();
      if (!post.data.length) {
        setStatus('no-posts');
        return;
      }
      setStatus('posts');
      setPostData(post.data);
    };
    getPostData();
  }, []);

  function DataList({ posts }) {
    const list = posts.map((post) => (
      <li key={`${post._id}`}>
        <div className="post-container">
          <div className="post-inner-container">
            <div className="avatar">
              <img src={post.author.avatar} alt="" />
            </div>
            <div className="post-content-container">
              <div className="post-info">
                <div className="nickname">
                  <p>
                    <b>{post.author.nickname}</b>
                  </p>
                </div>
                <div className="username">
                  <p>@{post.author.username}</p>
                </div>
                <div className="dot"> ·</div>
                <div className="post-time">
                  <p>{moment(post.created_at).fromNow()}</p>
                </div>
              </div>
              <div className="content">
                <p>{post.content}</p>
              </div>
              <div className="post-pic">
                <img src={post.photo} alt="" />
              </div>
              <div className="comment">
                <img src={reply} alt="" />
                <p className="comment-count">{post.comments.length}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    ));
    return <ul>{list}</ul>;
  }

  if (status === loading) {
    return (
      <div className="loading following-loading">
        <img src={loading} alt="loading" />
      </div>
    );
  }

  if (status === 'posts') {
    return (
      <>
        <div>
          <DataList posts={Array.from(postData)} />
        </div>
        <div className="foot-space" />
      </>
    );
  }

  return (
    <div className="following-error-message__wrapper">
      <p className="following-error-message">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        There's no posts here. Please follow some users first.
      </p>
    </div>
  );
};

export default FollowingUsersPosts;
