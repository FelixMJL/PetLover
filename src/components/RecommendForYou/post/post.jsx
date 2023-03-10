import "./post.css";
import replyIcon from "../../../assets/reply.png";
import React from "react";
import moment from "moment";

const Post = ({ author, content, photo, comments, created_at }) => (
  <div className="post_container">
    <div className="post_inner-container">
      <img src={author.avatar} className="post_avatar" alt="avatar"></img>
      <div className="post_content-container">
        <div className="post_author-info-container">
          <span className="post_author-nick-name">{author.nickname}</span>
          <span className="post_author-user-name">@{author.username}</span>
          <div className="post_time">
            <p>{moment(created_at).fromNow()}</p>
          </div>
        </div>
        <div className="post_content-text">
          <p>{content}</p>
        </div>
        <div className="post_content-image">
          <img src={photo} alt="Content img" />
        </div>
        <div className="post_comments">
          <img src={replyIcon} alt="Reply icon" />
          <p className="post_comments-count">{comments.length}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Post;
