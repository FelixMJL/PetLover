import './post.css';
import React from 'react';
import moment from 'moment';
import { FaRegComment } from 'react-icons/fa';

const Post = ({ author, content, photo, comments, created_at }) => (
  <div className="post_container">
    <div className="post_inner-container">
      <img src={author.avatar} className="post_avatar" alt="avatar" />
      <div className="post_content-container">
        <div className="post_author-info-container">
          <span className="post_author-nick-name">{author.nickname}</span>
          <span className="post_author-user-name">@{author.username}</span>
          <div className="post_time">
            <span>·{moment(created_at).fromNow()}</span>
          </div>
        </div>
        <div className="post_content-text">
          <p>{content}</p>
        </div>
        <img src={photo} className="post_content-image" alt="Content img" />
        <div className="post_comments">
          <FaRegComment />
          <span className="post_comments-count">{comments.length}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Post;
