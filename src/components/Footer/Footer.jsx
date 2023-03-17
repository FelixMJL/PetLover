import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import homeLogo from '../../assets/home.png';
import connectLogo from '../../assets/connect.png';
import brandLogo from '../../assets/brand.png';

const Footer = () => (
  <div className="footer">
    <Link to="/" className="footerLogoLink">
      <img src={homeLogo} alt="logo" className="logoInFooter" />
    </Link>
    <Link to="/connect" className="footerLogoLink">
      <img src={connectLogo} alt="logo" className="logoInFooter" />
    </Link>
    <Link to="/" className="footerLogoLink">
      <img src={brandLogo} alt="brandLogo" className="logoInFooter" />
    </Link>
  </div>
);

export default Footer;
