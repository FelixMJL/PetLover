import React, { useState, useEffect } from 'react';
import './SinglePost.css';
import moment from 'moment';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData } from '../../services/getUserData';
import DeleteItem from '../DeleteItem/DeleteItem';
import back from '../../assets/left-arrow.png';
import replyLogo from '../../assets/reply.png';
import Footer from '../Footer/Footer';
import SendComment from '../SendComment/SendComment';
import SendReply from '../SendReply/SendReply';

const SinglePost = ({ postId, currentUserId }) => {
  const [singlePostData, setSinglePostData] = useState();
  const navigate = useNavigate();
  const [currentUserData, setUserData] = useState(0);
  const [inputComment, setInputComment] = useState('');
  const [isValidComment, setIsValidComment] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [showSendComment, setShowSendComment] = useState(false);
  const [showSendReply, setShowSendReply] = useState(false);

  const avatarClickHandler = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/profile/${id}`);
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
    const getSinglePostData = async () => {
      try {
        const getSinglePost = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts/${postId}`,
          getUserData().config,
        );
        setSinglePostData(getSinglePost.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getSinglePostData();
  }, []);

  const browserNavigate = useNavigate();

  const commentAuthorId = currentUserData.id || '';

  const commentChangeHandler = (e) => {
    setInputComment(e.target.value);
  };

  useEffect(() => {
    if (inputComment) {
      setIsValidComment(true);
    } else {
      setIsValidComment(false);
    }
  }, [inputComment]);

  const sendComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments`,
        {
          author: commentAuthorId,
          comment_to: postId,
          comment: inputComment,
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

  useEffect(() => {
    const getCommentData = async () => {
      try {
        if (!singlePostData) {
          return;
        }
        setCommentsData(singlePostData.comments);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getCommentData();
  }, [singlePostData]);

  const commentClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSendComment(true);
  };

  const replyClickHandler = (e, commentId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSendReply(commentId);
  };

  if (!singlePostData) return null;
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
          <span>Post</span>
        </div>
        <div className="singlePost_post-container">
          <div className="singlePost_author-header-container">
            <div className="singlePost_author-info-container">
              <img
                src={singlePostData.author.avatar}
                className="singlePost_avatar"
                alt="avatar"
                onClick={(e) => avatarClickHandler(e, singlePostData.author.id)}
              />
              <div className="singlePost_author-names-container">
                <span
                  className="singlePost_author-nick-name"
                  onClick={(e) => avatarClickHandler(e, singlePostData.author.id)}
                >
                  {singlePostData.author.nickname}
                </span>
                <span
                  className="singlePost_author-user-name"
                  onClick={(e) => avatarClickHandler(e, singlePostData.author.id)}
                >
                  @{singlePostData.author.username}
                </span>
                <div className="singlePost_time">
                  <span>· {moment(singlePostData.created_at).fromNow()}</span>
                </div>
              </div>
            </div>
            <div>
              {singlePostData.author.id === currentUserId ? (
                <DeleteItem postId={postId} onPostPage />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="singlePost_content-container">
            {singlePostData.content && (
              <div className="singlePost_content-text">
                <div>{singlePostData.content}</div>
              </div>
            )}
            {singlePostData.file_url && singlePostData.file_type.includes('image') ? (
              <img
                src={singlePostData.file_url}
                className="singlePost_content-image"
                alt="Content img"
              />
            ) : null}
            {singlePostData.file_url && singlePostData.file_type.includes('video') ? (
              <video className="singlePost_content-video" controls autoPlay loop muted>
                <source src={singlePostData.file_url} type="video/mp4" />
              </video>
            ) : null}
            <div className="singlePost_time">
              <span>{singlePostData.created_at}</span>
            </div>
            <div className="singlePost_comments">
              <img
                src={replyLogo}
                alt="replyLogo"
                className="singlePost_comments-replyLogo"
                onClick={commentClickHandler}
              />
              <span className="singlePost_comments-count">{commentsData.length}</span>
            </div>
          </div>
          <div className="singlePost_reply-post">
            <img src={currentUserData.avatar} className="singlePost_avatar" alt="avatar" />
            <div className="sendComment_content-wrapper">
              <textarea
                className="singlePost_reply-textarea"
                placeholder="Post your reply"
                onChange={commentChangeHandler}
              />
            </div>
            <button
              className={`singlePost_reply-btn ${
                isValidComment ? 'singlePost_reply-btn-active' : ''
              }`}
              onClick={sendComment}
              disabled={!isValidComment}
              type="submit"
            >
              Reply
            </button>
          </div>
          <div className="singlePost_user-comments">
            {commentsData &&
              commentsData.map((commentData) => (
                <div key={commentData._id} className="post_container">
                  <Link
                    className="singlePost_comment-inner-container"
                    to={`/comment/${commentData._id}`}
                  >
                    <img
                      src={commentData.author.avatar}
                      className="post_avatar"
                      alt="avatar"
                      onClick={(e) => avatarClickHandler(e, commentData.author.id)}
                    />
                    <div className="post_content-container">
                      <div className="post_info-container">
                        <div className="post_author-info-container">
                          <span
                            className="post_author-nick-name"
                            onClick={(e) => avatarClickHandler(e, commentData.author.id)}
                          >
                            {commentData.author.nickname}
                          </span>
                          <span
                            className="post_author-user-name"
                            onClick={(e) => avatarClickHandler(e, commentData.author.id)}
                          >
                            @{commentData.author.username}
                          </span>
                          <div className="post_time">
                            <span>· {moment(commentData.created_at).fromNow()}</span>
                          </div>
                          <div className="singlePost_replying-to">
                            Replying to
                            <span
                              className="singlePost_replying-to-user-nick-name"
                              onClick={(e) => avatarClickHandler(e, singlePostData.author.id)}
                            >
                              @{singlePostData.author.nickname}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="post_content-container">
                        {commentData.comment && (
                          <div className="post_content-text">
                            <p>{commentData.comment}</p>
                          </div>
                        )}
                        <div className="post_comments">
                          <img
                            src={replyLogo}
                            alt="replyLogo"
                            className="post_comments-replyLogo"
                            onClick={(e) => replyClickHandler(e, commentData._id)}
                          />
                          <span className="post_comments-count">{commentData.replies.length}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <SendReply
                    itemData={commentData}
                    currentUserData={currentUserData}
                    setShowSendReply={setShowSendReply}
                    showSendReply={showSendReply === commentData._id}
                  />
                  <div>
                    {commentData.author.id === currentUserId ? (
                      <DeleteItem
                        commentId={commentData._id}
                        setCommentsData={setCommentsData}
                        commentsData={commentsData}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
      <SendComment
        postAuthor={singlePostData.author}
        postContent={singlePostData.content}
        postFile_type={singlePostData.file_type}
        postFile_url={singlePostData.file_url}
        comments={singlePostData.comments}
        postCreated_at={singlePostData.created_at}
        postId={singlePostData._id}
        currentUserData={currentUserData}
        setShowSendComment={setShowSendComment}
        showSendComment={showSendComment}
      />
    </div>
  );
};

export default SinglePost;
