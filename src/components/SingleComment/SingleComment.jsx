import React, { useState, useEffect } from 'react';
import './SingleComment.css';
import moment from 'moment';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/getUserData';
import DeleteItem from '../DeletePost/DeleteItem';
import back from '../../assets/left-arrow.png';
import replyLogo from '../../assets/reply.png';
import Footer from '../Footer/Footer';

const SingleComment = ({ commentId, currentUserId, setCommentsData, commentsData }) => {
  const [singleCommentData, setSingleCommentData] = useState();
  const navigate = useNavigate();
  const [currentUserData, setUserData] = useState(0);

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
    const getSingleCommentData = async () => {
      try {
        const getSingleComment = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments/${commentId}`,
          getUserData().config,
        );
        setSingleCommentData(getSingleComment.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getSingleCommentData();
  }, []);

  const browserNavigate = useNavigate();

  if (!singleCommentData) return null;
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
          <span>Comment</span>
        </div>
        <div className="singlePost_post-container">
          <div className="singlePost_author-header-container">
            <div className="singlePost_author-info-container">
              <img
                src={singleCommentData.author.avatar}
                className="singlePost_avatar"
                alt="avatar"
              />
              <div className="singlePost_author-names-container">
                <span className="singlePost_author-nick-name">
                  {singleCommentData.author.nickname}
                </span>
                <span className="singlePost_author-user-name">
                  @{singleCommentData.author.username}
                </span>
                <div className="singlePost_time">
                  <span>· {moment(singleCommentData.created_at).fromNow()}</span>
                </div>
              </div>
            </div>
            <div>
              {singleCommentData.author.id === currentUserId ? (
                <DeleteItem
                  commentId={commentId}
                  setCommentsData={setCommentsData}
                  commentsData={commentsData}
                  onCommentPage
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="singlePost_content-container">
            {singleCommentData.comment && (
              <div className="singlePost_content-text">
                <div>{singleCommentData.comment}</div>
              </div>
            )}
            <div className="singlePost_time">
              <span>{singleCommentData.created_at}</span>
            </div>
            <div className="singlePost_comments">
              <img src={replyLogo} alt="replyLogo" className="singlePost_comments-replyLogo" />
              <span className="singlePost_comments-count">{singleCommentData.replies.length}</span>
            </div>
          </div>
          <div className="singlePost_reply-post">
            <img src={currentUserData.avatar} className="singlePost_avatar" alt="avatar" />
            <textarea className="singlePost_reply-textarea" placeholder="Post your reply" />
            <button className="singlePost_reply-btn" type="submit">
              Reply
            </button>
          </div>
          <div className="singlePost_user-comments">
            {singleCommentData.replies &&
              singleCommentData.replies.map((replyData) => (
                <div key={replyData._id} className="post_container">
                  <div className="singlePost_comment-inner-container">
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
                            <Link className="singlePost_replying-to-user-nick-name" to={` `}>
                              @{singleCommentData.author.nickname}
                            </Link>
                          </div>
                        </div>
                        <div>
                          {replyData.author.id === currentUserId ? (
                            <DeleteItem commentReplyId={replyData._id} />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="post_content-container">
                        {replyData.comment && (
                          <div className="post_content-text">
                            <p>{replyData.comment}</p>
                          </div>
                        )}
                        <div className="post_comments">
                          <img
                            src={replyLogo}
                            alt="replyLogo"
                            className="post_comments-replyLogo"
                          />
                          <span className="post_comments-count">{replyData.replies.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleComment;
