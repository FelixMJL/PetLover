import React from 'react';
// import ReactDOM from 'react-dom';
import './DeletePost.css';

const DeletePostConfirmation = ({ show, onClose, handleDeletePost }) => {
  if (!show) return null;
  return (
    <div className="deletePostConfirmation_BackgroundOverlay">
      <div className="deletePostConfirmation_Container">
        <button
          type="button"
          className="deletePostConfirmation_DeleteBtn"
          onClick={handleDeletePost}
        >
          Delete
        </button>
        <button type="button" className="deletePostConfirmation_CancelBtn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostConfirmation;
