import React, { useState, useEffect } from 'react';
import '../RecommendForYou/post/post.css';
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
      <div key={`${post._id}`}>
        <div className="post_container">
          <div className="post_inner-container">
            <img className="post_avatar" src={post.author.avatar} alt="" />
            <div className="post-content-container">
              <div className="post_author-info-container">
                <span className="post_author-nick-name">{post.author.nickname}</span>
                <span className="post_author-user-name">@{post.author.username}</span>
                <div className="post_time">
                  <span>{moment(post.created_at).fromNow()}</span>
                </div>
              </div>
              <div className="post_content-text">
                <p>{post.content}</p>
              </div>
              <div className="post_content-image">
                <img src={post.photo} alt="Content img" />
              </div>
              <div className="post_comments">
                <img src={reply} alt="Reply icon" />
                <span className="post_comments-count">{post.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return <ul className="post_ul">{list}</ul>;
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
