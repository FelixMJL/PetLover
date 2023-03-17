import './post.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import replyLogo from '../../../assets/reply.png';

const Post = ({ author, content, file_type, file_url, comments, created_at }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  useEffect(() => {
    if (!file_type) {
      return;
    }
    if (file_type.includes('image')) {
      setImageUrl(file_url);
      return;
    }
    if (file_type.includes('video')) {
      setVideoUrl(file_url);
    }
  }, []);

  return (
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
          {content && (
            <div className="post_content-text">
              <p>{content}</p>
            </div>
          )}
          {imageUrl && <img src={imageUrl} className="post_content-image" alt="Content img" />}
          {videoUrl && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video className="post_content-video" controls autoPlay loop muted>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
          <div className="post_comments">
            <img src={replyLogo} alt="replyLogo" className="post_comments-replyLogo" />
            <span className="post_comments-count">{comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
