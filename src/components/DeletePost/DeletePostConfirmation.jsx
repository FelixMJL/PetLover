import React from 'react';
import './DeletePostConfirmation.css';

const DeletePostConfirmation = ({ show, onClose, handleDeletePost }) => {
  if (!show) return null;
  return (
    <div className="deletePostConfirmation_BackgroundOverlay">
      <div className="deletePostConfirmation_Container">
        <div className="deletePostConfirmation_ContentContainer">
          <div>
            <strong>Delete Post?</strong>
            <p>
              This can&apos;t be undone and it will be removed from your profile, the timeline of
              any accounts that follow you.
            </p>
          </div>
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
    </div>
  );
};

export default DeletePostConfirmation;
