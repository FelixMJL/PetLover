import React from 'react';
import './EditProfile.css';
import Footer from '../Footer/Footer';
import back from '../../assets/left-arrow.png';

const EditProfile = ({ setShowEditProfile }) => {
  const backClickHandler = () => {
    setShowEditProfile(false);
  };
  return (
    <div className="editProfile">
      <div className="editProfile__header">
        <div className="editProfile__header-title">
          <img className="btn btn-back" src={back} alt="back" onClick={backClickHandler} />
          <div className="editProfile__header-text">Edit Profile</div>
        </div>
        <button type="button" className="editProfile__header-btn">
          Save
        </button>
      </div>
      <div className="editProfile__content">
        <input
          id="imageInput"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,video/*"
          hidden
        />
        <label htmlFor="imageInput">
          <img src="" alt="upload_image" />
        </label>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
