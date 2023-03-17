import React, { useState } from 'react';
import axios from 'axios';
import bin from '../../assets/bin.png';
import './DeletePost.css';
import DeletePostConfirmation from './DeletePostConfirmation';
import { getUserData } from '../../services/getUserData';

const DeletePost = ({ postId }) => {
  const [showDeletePostConfirmation, setShowDeletePostConfirmation] = useState(false);
  const toDeletePost = () => {
    axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts/${postId}`,
      getUserData().config,
    );
  };

  return (
    <div>
      <button
        type="button"
        className="post_bin-wrapper"
        onClick={() => setShowDeletePostConfirmation(true)}
      >
        <img src={bin} className="post_bin-icon" alt="rubbish-bin" />
      </button>
      <DeletePostConfirmation
        show={showDeletePostConfirmation}
        onClose={() => {
          setShowDeletePostConfirmation(false);
        }}
        handleDeletePost={() => {
          toDeletePost();
          setShowDeletePostConfirmation(false);
        }}
      />
    </div>
  );
};

export default DeletePost;
