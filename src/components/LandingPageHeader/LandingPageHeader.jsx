import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoPetLover from '../../assets/logo-PetLover.png';
import hamburgerIcon from '../../assets/icon-hamburger.png';
import closePageIcon from '../../assets/icon-close.png';
import arrowForward from '../../assets/arrow-forward.png';
import profileIcon from '../../assets/icon-profile.png';
import connectIcon from '../../assets/personal-connections.svg';
import chatGpt from '../../assets/chatGPT.svg';
import imageGeneration from '../../assets/openai-image.svg';
import postIcon from '../../assets/icon-post.png';
import replyIcon from '../../assets/reply.png';
import exampleEditProfile from '../../assets/ExampleEditProfile.png';
import exampleConnect from '../../assets/ExampleConnect.png';
import exampleSendPost from '../../assets/ExampleSendPost.png';
import exampleComment from '../../assets/ExampleComment.png';
import exampleChatGPT from '../../assets/ExampleChatGPT.gif';
import exampleImageGeneration from '../../assets/ExampleImageGeneration.png';
import './LandingPageHeader.css';

const LandingPageHeader = ({ setShowPageContent }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showOverlays, setShowOverlays] = useState(Array(6).fill(false));
  const expandedMenu = useRef(null);
  const featuresMenu = useRef(null);

  const featureItems = [
    {
      src: exampleEditProfile,
      altExample: 'editProfileExample',
      icon: profileIcon,
      altIcon: 'profile-icon',
      text: 'Edit Profile',
    },
    {
      src: exampleConnect,
      altExample: 'connectExample',
      icon: connectIcon,
      altIcon: 'connect-icon',
      text: 'Connect',
    },
    {
      src: exampleSendPost,
      altExample: 'sendPostExample',
      icon: postIcon,
      altIcon: 'post-icon',
      text: 'Post',
    },
    {
      src: exampleComment,
      altExample: 'commentExample',
      icon: replyIcon,
      altIcon: 'comment-icon',
      text: 'Comment',
    },
    {
      src: exampleChatGPT,
      altExample: 'ChatGPTExample',
      icon: chatGpt,
      altIcon: 'ChatGPT-icon',
      text: 'ChatGPT',
    },
    {
      src: exampleImageGeneration,
      altExample: 'imageGenerationExample',
      icon: imageGeneration,
      altIcon: 'imageGeneration-icon',
      text: 'Image Generation',
    },
  ];

  const expandMenu = () => {
    expandedMenu.current.classList.add('landingPageHeader_active-menu');
  };

  const closeMenu = () => {
    expandedMenu.current.classList.remove('landingPageHeader_active-menu');
  };

  useEffect(() => {
    if (expandedMenu.current) {
      if (showMenu) {
        expandMenu();
      } else {
        closeMenu();
      }
    }
  }, [showMenu]);

  const extendFeaturesMenu = () => {
    featuresMenu.current.classList.add('landingPageHeader_active-menu');
  };

  const closeFeaturesMenu = () => {
    featuresMenu.current.classList.remove('landingPageHeader_active-menu');
  };

  useEffect(() => {
    if (featuresMenu.current) {
      if (showFeatures) {
        extendFeaturesMenu();
      } else {
        closeFeaturesMenu();
      }
    }
  }, [showFeatures]);

  const handleRevealClick = (index) => {
    const imageContainer = document.getElementById(`image-container-${index}`);
    const newShowOverlays = [...showOverlays];
    newShowOverlays[index] = true;
    setShowOverlays(newShowOverlays);
    setTimeout(() => {
      imageContainer.classList.add('reveal');
    }, 0);
  };

  const hideImageAndOverlay = (index) => {
    const imageContainer = document.getElementById(`image-container-${index}`);
    imageContainer.classList.remove('reveal');
    const newShowOverlays = [...showOverlays];
    newShowOverlays[index] = false;
    setShowOverlays(newShowOverlays);
  };

  return (
    <div className="landingPageHeader_container">
      <div className="landingPageHeader_header-container">
        <div className="landingPageHeader_logo">
          <img src={logoPetLover} alt="logo-PetLover" />
          <p>PetLover</p>
        </div>
        {!showMenu ? (
          <div className="landingPageHeader_Menu-Icon">
            <img
              src={hamburgerIcon}
              onClick={() => {
                setShowMenu(true);
                setShowPageContent(false);
              }}
              alt="hamburger-icon"
            />
          </div>
        ) : (
          <div className="landingPageHeader_Menu-Icon">
            <img
              src={closePageIcon}
              onClick={() => {
                setShowMenu(false);
                setShowPageContent(true);
                setShowFeatures(false);
              }}
              alt="close-page-icon"
            />
          </div>
        )}
      </div>
      {showMenu && (
        <div className="landingPageHeader_expanded-menu" ref={expandedMenu}>
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
            <div className="landingPageHeader_features-items-container" ref={featuresMenu}>
              {featureItems.map((image, index) => (
                <React.Fragment key={image.altExample}>
                  <div
                    className="landingPageHeader_image-reveal landingPageHeader_features-item"
                    onClick={() => handleRevealClick(index)}
                  >
                    <img className="item-icon" src={image.icon} alt={image.altIcon} />
                    <span>{image.text}</span>
                  </div>
                  <div
                    id={`image-container-${index}`}
                    className="hidden landingPageHeader_image-container"
                  >
                    <img
                      src={image.src}
                      alt={image.altExample}
                      onClick={() => hideImageAndOverlay(index)}
                    />
                  </div>
                  {showOverlays[index] && (
                    <div className="overlay" onClick={() => hideImageAndOverlay(index)} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms and Conditions</Link>
          <Link to="/team">Our Team</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
        </div>
      )}
    </div>
  );
};

export default LandingPageHeader;
