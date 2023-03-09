import './post.css';
import { FaRegComment } from 'react-icons/fa';
import React from 'react';

const Post = ({ author, content, image, comments }) => (
  <div className="post-items">
    <img src={author.avatar} className="post-items_avatar" alt="avatar" />
    <div className="post-items-r">
      <div className="post-items_names">
        <span className="names_nickname">{author.nickname}</span>
        <span className="names_username">@{author.username}</span>
      </div>
      <div className="post-items_content-img">
        <p className="content-img_content">{content}</p>
        <img src={image} className="content-img_img" alt="content-img" />
        <div className="comments">
          <FaRegComment className="comments-icon" />
          <span className="comments-number">{comments.length}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Post;
