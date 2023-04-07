import './PostContent.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import DeleteItem from '../../DeleteItem/DeleteItem';
import { getUserData } from '../../../services/getUserData';
import SendComment from '../../SendComment/SendComment';
import replyLogo from '../../../assets/reply.png';

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
  currentUserData,
}) => {
  const currentUserId = getUserData().id;
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showSendComment, setShowSendComment] = useState(false);
  const navigate = useNavigate();

  const avatarClickHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/profile/${author.id}`);
  };

  const commentClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSendComment(true);
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
          <DeleteItem postId={_id} setPostData={setPostData} postData={postData} />
        ) : (
          ''
        )}
      </div>
      <Link className="post_inner-container" to={`/post/${_id}`}>
        <img
          src={author.avatar}
          className="post_avatar"
          alt="avatar"
          onClick={avatarClickHandler}
        />
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
            <img
              src={replyLogo}
              alt="replyLogo"
              className="post_comments-replyLogo"
              onClick={commentClickHandler}
            />
            <span className="post_comments-count">{comments.length}</span>
          </div>
        </div>
      </Link>
      <SendComment
        postAuthor={author}
        postContent={content}
        postFile_type={file_type}
        postFile_url={file_url}
        comments={comments}
        postCreated_at={created_at}
        postId={_id}
        currentUserData={currentUserData}
        setShowSendComment={setShowSendComment}
        showSendComment={showSendComment}
      />
    </div>
  );
};
export default PostContent;
