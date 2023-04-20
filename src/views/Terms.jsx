import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaArrowCircleUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/left-arrow.png';
import './Privacy.css';

const Terms = () => {
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
            <p className="webname">Terms &amp; Conditions</p>
          </div>
        </div>
      </div>
      <div className="contentTitle">
        <h1>Terms &amp; Conditions</h1>
      </div>
      <div className="date">Effective: April 1, 2023</div>
      <div className="contentBox">
        <div className="contentWrapper">
          <p>
            By visiting Pet Lover, you agree that the laws of the state of Victoria Australia,
            without regard to principles of conflict of laws, will govern these Conditions of Use
            and any dispute of any sort that might arise between you and Pet Lover or its
            associates.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All content displayed and made available through this website is automatically placed
            under copyright law and is considered intellectual property owned by Pet Lover. It may
            not be reproduced, published, transmitted or copied without express permission from the
            owner.
          </p>
          <h2>Privacy and Personal Information</h2>
          <p>
            Please refer to our privacy policy for further information on what data we collect and
            how it is used.
          </p>
          <h2>Electronic Communications</h2>
          <p>
            When you visit Pet Lover or send emails to us, you are communicating with us
            electronically. In doing so you consent to receive communications from us
            electronically. We will communicate with you via email or by posting notices on this
            website. You agree that all agreements, notices, disclosures and other communications
            that we provide to you electronically satisfy any legal requirement that such
            communications be in writing.
          </p>
          <h2>Site Usage</h2>
          <p>
            If you use this website, you are responsible for maintaining the confidentiality of your
            account information and your account passwords. You are also responsible for restricting
            access to your computer should it have saved passwords or account login information
            stored. Further you agree to accept responsibility for all activities that occur under
            your account or password. If you are under 18, you may use our website only with
            involvement of a parent or guardian. Pet Lover and its associates reserve the right to
            refuse service, terminate accounts, remove or edit content, or cancel orders at their
            discretion.
          </p>
          <h2>Reviews, Comments, Emails &amp; Other Content</h2>
          <p>
            Visitors may post reviews, comments, and other content: and submit suggestions, ideas,
            comments, questions, or other information, so long as the content is not illegal,
            obscene, threatening, defamatory, invasive of privacy, infringing of intellectual
            property rights, or otherwise injurious to third parties or objectionable and does not
            consist of or contain software viruses, political campaigning, commercial solicitation,
            chain letters, mass mailings, or any form of &quot spam &quot. You may not use a false
            address, impersonate any person or entity, or otherwise mislead as to the origin of a
            card or other content. Pet Lover reserves the right (but not the obligation) to remove
            or edit such content, but does not regularly review posted content.
          </p>
          <p>
            If you do post content or submit material, and unless we indicate otherwise, you grant
            Pet Lover and its associates a nonexclusive, royalty-free, perpetual, irrevocable, and
            fully sub licensable right to use, reproduce, modify, adapt, publish, translate, create
            derivative works from, distribute, and display such content throughout the world in any
            media. You grant Pet Lover and its associates and sub licensees the right to use the
            name that you submit in connection with such content, if they choose. You represent and
            warrant that you own or otherwise control all of the rights to the content that you
            post: that the content is accurate: that use of the content you supply does not violate
            this policy and will not cause injury to any person or entity: and that you will
            indemnify Pet Lover or its associates for all claims resulting from content you supply.
            Pet Lover has the right but not the obligation to monitor and edit or remove any
            activity or content. Pet Lover takes no responsibility and assumes no liability for any
            content posted by you or any third party.
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

export default Terms;
