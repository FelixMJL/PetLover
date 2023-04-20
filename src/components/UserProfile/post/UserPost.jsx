import '../../RecommendForYou/post/PostContent.css';
import React, { useState, useEffect } from 'react';
import replyLogo from '../../../assets/reply.png';

const UserPost = ({ content, file_type, file_url, comments, postId, commentClickHandler }) => {
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
    <div className="post_content-container">
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
        <img
          src={replyLogo}
          alt="replyLogo"
          className="post_comments-replyLogo"
          onClick={(e) => commentClickHandler(e, postId)}
        />
        <span className="post_comments-count">{comments.length}</span>
      </div>
    </div>
  );
};

export default UserPost;
