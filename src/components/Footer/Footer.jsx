import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import homeLogo from '../../assets/home.png';
import connectLogo from '../../assets/personal-connections.svg';
import chatGpt from '../../assets/chatGPT.svg';
import imageGeneration from '../../assets/openai-image.svg';

const Footer = () => (
  <div className="footer">
    <Link to="/" className="footerLogoLink">
      <img src={homeLogo} alt="logo" className="logoInFooter" />
    </Link>
    <Link to="/connect" className="footerLogoLink">
      <img src={connectLogo} alt="logo" className="logoInFooter" />
    </Link>
    <Link to="/chatGpt" className="footerLogoLink">
      <img src={chatGpt} alt="chatGpt" className="logoInFooter" />
    </Link>
    <Link to="/image" className="footerLogoLink">
      <img src={imageGeneration} alt="imageGeneration" className="logoInFooter" />
    </Link>
  </div>
);

export default Footer;
