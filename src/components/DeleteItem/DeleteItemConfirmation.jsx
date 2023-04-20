import React from 'react';
import './DeleteItemConfirmation.css';

const DeleteItemConfirmation = ({
  show,
  onClose,
  handleDeletePost,
  handleDeleteComment,
  handleDeleteReply,
  postId,
  commentId,
  replyId,
}) => {
  const handleDeleteItem = () => {
    if (postId) {
      return handleDeletePost();
    }
    if (commentId) {
      return handleDeleteComment();
    }
    if (replyId) {
      return handleDeleteReply();
    }
    return null;
  };

  if (!show) return null;
  return (
    <div className="deleteItemConfirmation_BackgroundOverlay">
      <div className="deleteItemConfirmation_Container">
        <div className="deleteItemConfirmation_ContentContainer">
          <div>
            {(() => {
              if (postId) {
                return <strong>Delete Post?</strong>;
              }
              if (commentId) {
                return <strong>Delete Comment?</strong>;
              }
              if (replyId) {
                return <strong>Delete Reply?</strong>;
              }
              return null;
            })()}

            <p>
              This can&apos;t be undone and it will be removed from your profile, the timeline of
              any accounts that follow you.
            </p>
          </div>
          <button
            type="button"
            className="deleteItemConfirmation_DeleteBtn"
            onClick={handleDeleteItem}
          >
            Delete
          </button>
          <button type="button" className="deleteItemConfirmation_CancelBtn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemConfirmation;
