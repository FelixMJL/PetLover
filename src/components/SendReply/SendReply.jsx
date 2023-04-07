import React, { useEffect, useState } from 'react';
import './SendReply.css';
import '../RecommendForYou/post/PostContent.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/left-arrow.png';
import { getUserData } from '../../services/getUserData';
import Footer from '../Footer/Footer';

const SendReply = ({ itemData, currentUserData, setShowSendReply, showSendReply }) => {
  const [reply, setReply] = useState('');
  const [isValidReply, setIsValidReply] = useState(false);
  const navigate = useNavigate();

  const avatarClickHandler = () => {
    navigate(`/profile/${itemData.author.id}`);
  };

  const backClickHandler = () => {
    setShowSendReply(false);
  };

  const replyAuthorId = currentUserData ? currentUserData.id : '';

  const replyChangeHandler = (e) => {
    setReply(e.target.value);
  };

  useEffect(() => {
    if (reply) {
      setIsValidReply(true);
    } else {
      setIsValidReply(false);
    }
  }, [reply]);

  const sendReply = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/replies`,
        {
          author: replyAuthorId,
          reply_to: itemData._id,
          reply,
        },
        getUserData().config,
      );
      if (response.status === 201) {
        window.location.reload();
        setShowSendReply(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in post function:', error);
    }
  };

  return (
    showSendReply && (
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
                isValidReply ? 'sendComment_reply-btn-active' : ''
              }`}
              onClick={sendReply}
              disabled={!isValidReply}
              type="submit"
            >
              Reply
            </button>
          </div>
          <div className="sendComment_post-container">
            <div className="sendComment_avatar-section">
              <img
                src={itemData.author.avatar}
                className="singlePost_avatar"
                alt="avatar"
                onClick={avatarClickHandler}
              />
              <div className="sendComment_avatar-link-line" />
            </div>
            <div className="sendComment_content-container">
              <div className="sendComment_author-info-container">
                <span className="post_author-nick-name">{itemData.author.nickname}</span>
                <span className="post_author-user-name">@{itemData.author.username}</span>
                <div className="post_time">
                  <span>· {moment(itemData.created_at).fromNow()}</span>
                </div>
              </div>
              {(itemData.comment || itemData.reply) && (
                <div className="post_content-text">
                  <p>{itemData.comment || itemData.reply}</p>
                </div>
              )}
            </div>
          </div>
          <div className="sendComment_content-body">
            <img className="singlePost_avatar" src={currentUserData.avatar} alt="" />
            <div className="sendComment_content-wrapper">
              <textarea
                className="sendComment_reply-textarea"
                placeholder="Post your reply"
                onChange={replyChangeHandler}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
};

export default SendReply;
