import React, { useState, useEffect } from 'react';
import './SingleReply.css';
import moment from 'moment';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/getUserData';
import DeleteItem from '../DeleteItem/DeleteItem';
// import SendReply from '../SendReply/SendReply';
import back from '../../assets/left-arrow.png';
import replyLogo from '../../assets/reply.png';
import Footer from '../Footer/Footer';
import SendReply from '../SendReply/SendReply';

const SingleReply = ({ replyId, currentUserId }) => {
  const [singleReplyData, setSingleReplyData] = useState();
  const navigate = useNavigate();
  const [currentUserData, setUserData] = useState(0);
  const [inputReply, setInputReply] = useState('');
  const [isValidReply, setIsValidReply] = useState(false);
  const [repliesData, setRepliesData] = useState([]);
  const [showSendReply, setShowSendReply] = useState(false);
  const [replyCurrentItem, setShowReplyCurrentItem] = useState(false);

  const replyCurrentItemClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowReplyCurrentItem(true);
  };

  const replyClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSendReply(true);
  };

  const replyAuthorId = currentUserData.id || '';

  const replyChangeHandler = (e) => {
    setInputReply(e.target.value);
  };

  useEffect(() => {
    if (inputReply) {
      setIsValidReply(true);
    } else {
      setIsValidReply(false);
    }
  }, [inputReply]);

  const sendReply = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/replies`,
        {
          author: replyAuthorId,
          reply_to: replyId,
          reply: inputReply,
        },
        getUserData().config,
      );
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in post function:', error);
    }
  };

  const getUser = () =>
    axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}`,
      getUserData().config,
    );

  useEffect(() => {
    // eslint-disable-next-line consistent-return,no-shadow
    const getUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
      } catch (error) {
        return error.message;
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getSingleReplyData = async () => {
      try {
        const getSingleReply = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/replies/${replyId}`,
          getUserData().config,
        );
        setSingleReplyData(getSingleReply.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getSingleReplyData();
  }, []);

  useEffect(() => {
    const getReplyData = async () => {
      try {
        if (!singleReplyData) {
          return;
        }
        setRepliesData(singleReplyData.replies);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getReplyData();
  }, [singleReplyData]);

  const browserNavigate = useNavigate();

  if (!singleReplyData) return null;
  return (
    <div className="singlePost_container">
      <div className="singlePost_inner-container">
        <div className="singlePost_content-header">
          <img
            className="singlePost_btn-back"
            src={back}
            alt="back"
            onClick={() => browserNavigate(-1)}
          />
          <span>Reply</span>
        </div>
        <div className="singlePost_post-container">
          <div className="singlePost_author-header-container">
            <div className="singlePost_author-info-container">
              <img src={singleReplyData.author.avatar} className="singlePost_avatar" alt="avatar" />
              <div className="singlePost_author-names-container">
                <span className="singlePost_author-nick-name">
                  {singleReplyData.author.nickname}
                </span>
                <span className="singlePost_author-user-name">
                  @{singleReplyData.author.username}
                </span>
                <div className="singlePost_time">
                  <span>· {moment(singleReplyData.created_at).fromNow()}</span>
                </div>
              </div>
            </div>
            <div>
              {singleReplyData.author.id === currentUserId ? (
                <DeleteItem replyId={replyId} onReplyPage />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="singlePost_content-container">
            {singleReplyData.reply && (
              <div className="singlePost_content-text">
                <div>{singleReplyData.reply}</div>
              </div>
            )}
            <div className="singlePost_time">
              <span>{singleReplyData.created_at}</span>
            </div>
            <div className="singlePost_comments">
              <img
                src={replyLogo}
                alt="replyLogo"
                className="singlePost_comments-replyLogo"
                onClick={replyCurrentItemClickHandler}
              />{' '}
              <span className="singlePost_comments-count">{singleReplyData.replies.length}</span>
            </div>
          </div>
          <div className="singlePost_reply-post">
            <img src={currentUserData.avatar} className="singlePost_avatar" alt="avatar" />
            <textarea
              className="singlePost_reply-textarea"
              placeholder="Post your reply"
              onChange={replyChangeHandler}
            />
            <button
              className={`singlePost_reply-btn ${
                isValidReply ? 'singlePost_reply-btn-active' : ''
              }`}
              onClick={sendReply}
              disabled={!isValidReply}
              type="submit"
            >
              Reply
            </button>
          </div>
          <div className="singlePost_user-comments">
            {repliesData &&
              repliesData.map((replyData) => (
                <div key={replyData._id} className="post_container">
                  <Link
                    className="singlePost_comment-inner-container"
                    to={`/reply/${replyData._id}`}
                  >
                    <img
                      src={replyData.author.avatar}
                      className="post_avatar"
                      alt="avatar"
                      onClick={() => {
                        navigate(`/profile/${replyData.author.id}`);
                      }}
                    />
                    <div className="post_content-container">
                      <div className="post_info-container">
                        <div className="post_author-info-container">
                          <span className="post_author-nick-name">{replyData.author.nickname}</span>
                          <span className="post_author-user-name">
                            @{replyData.author.username}
                          </span>
                          <div className="post_time">
                            <span>· {moment(replyData.created_at).fromNow()}</span>
                          </div>
                          <div className="singlePost_replying-to">
                            Replying to
                            <span className="singlePost_replying-to-user-nick-name">
                              @{singleReplyData.author.nickname}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="post_content-container">
                        {replyData.reply && (
                          <div className="post_content-text">
                            <p>{replyData.reply}</p>
                          </div>
                        )}
                        <div className="post_comments">
                          <img
                            src={replyLogo}
                            alt="replyLogo"
                            className="post_comments-replyLogo"
                            onClick={replyClickHandler}
                          />
                          <span className="post_comments-count">{replyData.replies.length}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div>
                    {replyData.author.id === currentUserId ? (
                      <DeleteItem
                        replyId={replyData._id}
                        setRepliesData={setRepliesData}
                        repliesData={repliesData}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <SendReply
                    itemData={replyData}
                    currentUserData={currentUserData}
                    setShowSendReply={setShowSendReply}
                    showSendReply={showSendReply}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
      <SendReply
        itemData={singleReplyData}
        currentUserData={currentUserData}
        setShowSendReply={setShowReplyCurrentItem}
        showSendReply={replyCurrentItem}
      />
    </div>
  );
};

export default SingleReply;
