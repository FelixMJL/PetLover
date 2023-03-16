import '../../RecommendForYou/post/post.css';
import React from 'react';
import replyLogo from '../../../assets/reply.png';

const UserPost = ({ content, photo, comments }) => (
  <div className="post_content-container">
    <div className="container">
      <div className="post_content-text">{content}</div>
      <img src={photo} className="post_content-image" alt="content-img" />
      <div className="post_comments">
        <img src={replyLogo} alt="replyLogo" className="post_comments-replyLogo" />
        <span className="post_comments-count">{comments.length}</span>
      </div>
    </div>
  </div>
);

export default UserPost;
