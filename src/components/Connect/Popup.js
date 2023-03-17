import React from 'react';
import './Popup.css';

const Popup = ({ show, username, handleConfirm, handleCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={handleCancel}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <p className="popup-message">
          {username ? (
            <>
              <span className="bold">Unfollow @{username}?</span>
              <br />
              <span className="normal">Their profile will no longer show up in your home timeline.You can still view their profile,unless their account are protected.</span>
            </>
          ) : (
            'Are you sure you want to unfollow this user?'
          )}
        </p>
        <div className="popup-buttons">
          <button className="popup-button popup-button-unfollow" onClick={handleConfirm}>
          UnFollow
          </button>
          <button className="popup-button popup-button-cancel" onClick={handleCancel}>
          Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;