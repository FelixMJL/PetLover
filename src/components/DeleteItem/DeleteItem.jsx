import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bin from '../../assets/bin.png';
import './DeleteItem.css';
import DeletePostConfirmation from './DeleteItemConfirmation';
import { getUserData } from '../../services/getUserData';

const DeleteItem = ({
  postId,
  commentId,
  replyId,
  setPostData,
  setCommentsData,
  setRepliesData,
  postData,
  commentsData,
  repliesData,
  onPostPage,
  onCommentPage,
  onReplyPage,
}) => {
  const [showDeleteItemConfirmation, setShowDeleteItemConfirmation] = useState(false);
  const navigate = useNavigate();

  const toDeletePost = () => {
    if (onPostPage) {
      axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts/${postId}`,
        getUserData().config,
      );
      setShowDeleteItemConfirmation(false);
      navigate(-1);
    } else {
      axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts/${postId}`,
        getUserData().config,
      );
      setPostData(postData.filter((post) => post._id !== postId));
      setShowDeleteItemConfirmation(false);
    }
  };

  const toDeleteComment = () => {
    if (onCommentPage) {
      axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments/${commentId}`,
        getUserData().config,
      );
      setShowDeleteItemConfirmation(false);
      navigate(-1);
    } else {
      axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments/${commentId}`,
        getUserData().config,
      );
      setCommentsData(commentsData.filter((comment) => comment._id !== commentId));
      setShowDeleteItemConfirmation(false);
    }
  };

  const toDeleteReply = () => {
    if (onReplyPage) {
      axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/replies/${replyId}`,
        getUserData().config,
      );
      setShowDeleteItemConfirmation(false);
      navigate(-1);
    } else {
      axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/replies/${replyId}`,
        getUserData().config,
      );
      setRepliesData(repliesData.filter((reply) => reply._id !== replyId));
      setShowDeleteItemConfirmation(false);
    }
  };
  const deleteClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteItemConfirmation(true);
  };

  return (
    <div>
      <button type="button" className="deleteItem_bin-wrapper" onClick={deleteClickHandler}>
        <img src={bin} className="post_bin-icon" alt="rubbish-bin" />
      </button>
      <DeletePostConfirmation
        show={showDeleteItemConfirmation}
        onClose={() => {
          setShowDeleteItemConfirmation(false);
        }}
        handleDeletePost={toDeletePost}
        handleDeleteComment={toDeleteComment}
        handleDeleteReply={toDeleteReply}
        postId={postId}
        commentId={commentId}
        replyId={replyId}
      />
    </div>
  );
};

export default DeleteItem;
