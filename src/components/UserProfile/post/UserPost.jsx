import '../../RecommendForYou/post/post.css';
import { FaRegComment } from 'react-icons/fa';
import React from 'react';

const UserPost = ({ content, photo, comments }) => (
  <div className="post_content-container">
    <div className="container">
      <div className="post_content-text">{content}</div>
      <img src={photo} className="post_content-image" alt="content-img" />
      <div className="post_comments">
        <FaRegComment />
        <span className="post_comments-count">{comments.length}</span>
      </div>
    </div>
  </div>
);

export default UserPost;
