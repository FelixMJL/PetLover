import React, { useState } from 'react';
import logoPetLover from '../../assets/logo-PetLover.png';
import hamburgerIcon from '../../assets/icon-hamburger.png';
import closePageIcon from '../../assets/icon-close.png';
import arrowForward from '../../assets/arrow-forward.png';
import profileIcon from '../../assets/icon-profile.png';
import connectLogo from '../../assets/personal-connections.svg';
import chatGpt from '../../assets/chatGPT.svg';
import imageGeneration from '../../assets/openai-image.svg';
import postIcon from '../../assets/icon-post.png';
import replyLogo from '../../assets/reply.png';

import './LandingPageHeader.css';

const LandingPageHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  // eslint-disable-next-line no-console
  //   console.log(showMenu);
  return (
    <div className="landingPageHeader_container">
      <div className="landingPageHeader_header-container">
        <div className="landingPageHeader_logo">
          <img src={logoPetLover} alt="logo-PetLover" />
          <p>PetLover</p>
        </div>
        {!showMenu ? (
          <div className="landingPageHeader_Menu-Icon">
            <img src={hamburgerIcon} onClick={() => setShowMenu(true)} alt="hamburger-icon" />
          </div>
        ) : (
          <div className="landingPageHeader_Menu-Icon">
            <img src={closePageIcon} onClick={() => setShowMenu(false)} alt="close-page-icon" />
          </div>
        )}
      </div>
      {showMenu && (
        <div className="landingPageHeader_expanded-menu">
          {!showFeatures ? (
            <div
              className="landingPageHeader_expandable-item"
              onClick={() => setShowFeatures(true)}
            >
              <span>Features</span>
              <img className="landingPageHeader_arrow" src={arrowForward} alt="arrow-forward" />
            </div>
          ) : (
            <div
              className="landingPageHeader_expandable-item"
              onClick={() => setShowFeatures(false)}
            >
              <span>Features</span>
              <img
                className="landingPageHeader_arrow-back"
                src={arrowForward}
                alt="arrow-forward"
              />
            </div>
          )}
          {showFeatures && (
            <div className="landingPageHeader_features-items-container">
              <div className="landingPageHeader_features-item">
                <img src={profileIcon} alt="profile-icon" />
                <span>Edit Profile</span>
              </div>
              <div className="landingPageHeader_features-item">
                <img src={connectLogo} alt="connect-icon" />
                <span>Connect</span>
              </div>
              <div className="landingPageHeader_features-item">
                <img src={postIcon} alt="post-icon" />
                <span>Post</span>
              </div>
              <div className="landingPageHeader_features-item">
                <img src={replyLogo} alt="reply-icon" />
                <span>Comment</span>
              </div>
              <div className="landingPageHeader_features-item">
                <img src={chatGpt} alt="chatGPT-icon" />
                <span>ChatGPT</span>
              </div>
              <div className="landingPageHeader_features-item">
                <img src={imageGeneration} alt="imageGeneration-icon" />
                <span>Image Generation</span>
              </div>
            </div>
          )}

          <div>Privacy</div>
          <div>Terms and Conditions</div>
          <div>Our Team</div>
          <div>Login</div>
          <div>Register</div>
        </div>
      )}
    </div>
  );
};

export default LandingPageHeader;
