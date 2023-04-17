import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingPageHeader from '../../components/LandingPageHeader/LandingPageHeader';
import './LandingPage.css';
import logo from '../../assets/logo.png';

const LandingPage = () => {
  const [showPageContent, setShowPageContent] = useState(true);
  return (
    <div className="landingPage_container">
      <LandingPageHeader setShowPageContent={setShowPageContent} />
      {showPageContent && (
        <div className="landingPage_page-content-container">
          <div className="landingPage_page_bg" />
          <div className="landingPage_page_bg landingPage_page_bg2" />
          <div className="landingPage_page_bg landingPage_page_bg3" />
          <img className="landingPage_page-content-logo" src={logo} alt="logo" />
          <h1 className="landingPage_page-content-slogan">
            Connect, Share, Love Your Furry World!
          </h1>
          <Link className="landingPage_page-content_button" to="/signup">
            Paw in!
          </Link>
        </div>
      )}
    </div>
  );
};
export default LandingPage;
