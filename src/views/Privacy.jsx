import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/left-arrow.png';
import './Privacy.css';

const Privacy = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const btnClickHandler = () => {
    navigate('/');
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', handleScroll);
  return (
    <div className="privacyBox">
      <div className="headerBox">
        <div className="connect-title-line">
          <div className="btn btn-back" onClick={btnClickHandler}>
            <img src={arrow} alt="left-arrow" />
          </div>
          <div className="usernameBox">
            <p className="webname">Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className="contentTitle">
        <h1>The Pet Lover Privacy Policy</h1>
      </div>
      <div className="date">Effective: April 1, 2023</div>
      <div className="contentBox">
        <div className="contentWrapper">
          <p>
            This Privacy Policy describes how your personal information is collected, used, and
            shared when you visit from https://petslovers.com.au.
          </p>
          <h2>What personal data we collect and why we collect it</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your device,
            including information about your web browser, IP address, time zone, and some of the
            token that are installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages that you view.
          </p>
          <h3>Comments</h3>
          <p>
            When visitors leave comments on the site, we collect the data shown in the comments
            form, and also the visitor’s IP address and browser user agent string to help spam
            detection.
          </p>
          <h3>Media</h3>
          <p>
            If you upload images to the website, you should avoid uploading images with embedded
            location data (EXIF GPS) included. Visitors to the website can download and extract any
            location data from images on the website.
          </p>
          <h3>Token</h3>
          <p>
            If you leave a comment on our site, you may opt-in to saving your name, email address
            and website in token. These are for your convenience so that you do not have to fill in
            your details again when you leave another comment.
          </p>
          <p>
            If you visit our login page, we will set a temporary token to determine if your browser
            accepts token. This token contains no personal data and is discarded when you close your
            browser.
          </p>
          <p>
            When you log in, we will also set up a token to save your login information. This login
            token lasts for 24 hours.
          </p>
          <h3>Sharing of Personal Information</h3>
          <p>
            Finally, we may also share your Personal Information to comply with applicable laws and
            regulations, to respond to a subpoena, search warrant or other lawful request for
            information we receive, or to otherwise protect our rights.
          </p>
          <h2>Targeted Advertising</h2>
          <p>
            As described above, we use your Personal Information to provide you with targeted
            advertisements or marketing communications we believe may be of interest to you.
          </p>
          <h2>Retention of Your Data</h2>
          <p>
            If you leave a comment, the comment and its metadata are retained indefinitely. This is
            so we can recognize and approve any follow-up comments automatically instead of holding
            them in a moderation queue.
          </p>
          <p>
            For users that register on our website (if any), we also store the personal information
            they provide in their user profile. All users can see, edit, or delete their personal
            information at any time (except they cannot change their username). Website
            administrators can also see and edit that information.
          </p>
          <h2>Your Rights</h2>
          <p>
            If you have an account on this site, or have left comments, you can request to receive
            an exported file of the personal data we hold about you, including any data you have
            provided to us. You can also request that we erase any personal data we hold about you.
            This does not include any data we are obliged to keep for administrative, legal, or
            security purposes.
          </p>
          <h2>Our contact information</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would
            like to make a complaint, please contact us by e-mail at fangweidong1985@gmail.com.
          </p>
          <h2>Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example,
            changes to our practices or for other operational, legal or regulatory reasons.
          </p>
        </div>
      </div>
      {showButton && (
        <div className="back-to-top" onClick={scrollToTop}>
          <FaArrowCircleUp />
        </div>
      )}
    </div>
  );
};

export default Privacy;
