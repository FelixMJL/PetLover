import React, { useState } from 'react';
import axios from 'axios';
import bin from '../../assets/bin.png';
import './DeletePost.css';
import DeletePostConfirmation from './DeletePostConfirmation';
import { getUserData } from '../../services/getUserData';

const DeletePost = ({ postIdDelete, postData, setPostData }) => {
  const [showDeletePostConfirmation, setShowDeletePostConfirmation] = useState(false);
  const toDeletePost = (e) => {
    e.preventDefault();
    e.stopPropagation();

    axios.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts/${postIdDelete}`,
      getUserData().config,
    );
    setPostData(postData.filter((post) => post._id !== postIdDelete));
    setShowDeletePostConfirmation(false);
  };

  const deleteClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowDeletePostConfirmation(true);
  };

  return (
    <div>
      <button type="button" className="post_bin-wrapper" onClick={deleteClickHandler}>
        <img src={bin} className="post_bin-icon" alt="rubbish-bin" />
      </button>
      <DeletePostConfirmation
        show={showDeletePostConfirmation}
        onClose={() => {
          setShowDeletePostConfirmation(false);
        }}
        handleDeletePost={toDeletePost}
      />
    </div>
  );
};

export default DeletePost;
