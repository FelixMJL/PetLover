import React, { useEffect, useState } from 'react';
import './SendComment.css';
import '../RecommendForYou/post/PostContent.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// import DeletePost from '../DeletePost/DeletePost';
import back from '../../assets/left-arrow.png';
import { getUserData } from '../../services/getUserData';
import Footer from '../Footer/Footer';

const SendComment = ({
  postId,
  currentUserData,
  postAuthor,
  postContent,
  postFile_type,
  postFile_url,
  postCreated_at,
  setShowSendComment,
  showSendComment,
}) => {
  const [comment, setComment] = useState('');
  const [isValidComment, setIsValidComment] = useState(false);
  const navigate = useNavigate();

  const avatarClickHandler = () => {
    navigate(`/profile/${postAuthor.id}`);
  };

  const backClickHandler = () => {
    setShowSendComment(false);
  };

  const commentAuthorId = currentUserData ? currentUserData.id : '';

  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    if (comment) {
      setIsValidComment(true);
    } else {
      setIsValidComment(false);
    }
  }, [comment]);

  const sendComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments`,
        {
          author: commentAuthorId,
          comment_to: postId,
          comment,
        },
        getUserData().config,
      );
      if (response.status === 201) {
        window.location.reload();
        setShowSendComment(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in post function:', error);
    }
  };

  return (
    showSendComment && (
      <div className="sendComment">
        <div className="sendComment_inner-container">
          <div className="sendComment_content-header">
            <img
              className="sendComment_btn-back"
              src={back}
              alt="back"
              onClick={backClickHandler}
            />
            <button
              className={`sendComment_reply-btn ${
                isValidComment ? 'sendComment_reply-btn-active' : ''
              }`}
              onClick={sendComment}
              disabled={!isValidComment}
              type="submit"
            >
              Reply
            </button>
          </div>
          <div className="sendComment_post-container">
            <div className="sendComment_avatar-section">
              <img
                src={postAuthor.avatar}
                className="singlePost_avatar"
                alt="avatar"
                onClick={avatarClickHandler}
              />
              <div className="sendComment_avatar-link-line" />
            </div>
            <div className="sendComment_content-container">
              <div className="sendComment_author-info-container">
                <span className="post_author-nick-name">{postAuthor.nickname}</span>
                <span className="post_author-user-name">@{postAuthor.username}</span>
                <div className="post_time">
                  <span>· {moment(postCreated_at).fromNow()}</span>
                </div>
              </div>
              {postContent && (
                <div className="post_content-text">
                  <p>{postContent}</p>
                </div>
              )}
              {postFile_url && postFile_type.includes('image') ? (
                <img src={postFile_url} className="post_content-image" alt="Content img" />
              ) : null}
              {postFile_url && postFile_type.includes('video') ? (
                <video className="post_content-video" controls autoPlay loop muted>
                  <source src={postFile_url} type="video/mp4" />
                </video>
              ) : null}
            </div>
          </div>
          <div className="sendComment_content-body">
            <img className="singlePost_avatar" src={currentUserData.avatar} alt="" />
            <div className="sendComment_content-wrapper">
              <textarea
                className="sendComment_reply-textarea"
                placeholder="Post your reply"
                onChange={commentChangeHandler}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
};

export default SendComment;
