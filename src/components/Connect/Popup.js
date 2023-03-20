import React from 'react';
import './Popup.css';

const Popup = ({ show, username, handleConfirm, handleCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={handleCancel}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-message">
          {username ? (
            <>
              <h1 className="bold">
                Unfollow
                <br />@{username}?
              </h1>
              <span className="normal">
                Their profile will no longer show up in your home timeline.You can still view their
                profile,unless their account are protected.
              </span>
            </>
          ) : (
            'Are you sure you want to unfollow this user?'
          )}
        </div>
        <div className="popup-buttons">
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="popup-button popup-button-unfollow" onClick={handleConfirm}>
            UnFollow
          </button>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="popup-button popup-button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
