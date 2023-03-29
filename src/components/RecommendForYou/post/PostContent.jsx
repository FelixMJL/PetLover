import './PostContent.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import DeletePost from '../../DeletePost/DeletePost';
import replyLogo from '../../../assets/reply.png';
import { getUserData } from '../../../services/getUserData';

const PostContent = ({
  author,
  content,
  file_type,
  file_url,
  comments,
  created_at,
  _id,
  postData,
  setPostData,
}) => {
  const currentUserId = getUserData().id;
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const avatarClinkHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/profile/${author.id}`);
  };

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
      <div>
        {author.id === currentUserId ? (
          <DeletePost postId={_id} setPostData={setPostData} postData={postData} />
        ) : (
          ''
        )}
      </div>
      <Link className="post_inner-container" to={`/post/${_id}`}>
        <div onClick={avatarClinkHandler}>
          <img src={author.avatar} className="post_avatar" alt="avatar" />
        </div>

        <div className="post_content-container">
          <div className="post_info-container">
            <div className="post_author-info-container">
              <span className="post_author-nick-name">{author.nickname}</span>
              <span className="post_author-user-name">@{author.username}</span>
              <div className="post_time">
                <span>· {moment(created_at).fromNow()}</span>
              </div>
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
      </Link>
    </div>
  );
};
export default PostContent;
