import React from 'react';
import './EditProfile.css';
// import axios from 'axios';
import Footer from '../Footer/Footer';
import back from '../../assets/left-arrow.png';
import camera from '../../assets/camera.svg';
// import { getUserData } from '../../services/getUserData';

const EditProfile = ({ setShowEditProfile, avatar }) => {
  // const [file_url, setFile_Url] = useState(avatar);
  const backClickHandler = () => {
    setShowEditProfile(false);
  };
  const handlerUpload = async (e) => {
    const file = e.target.files[0];
    // eslint-disable-next-line no-console
    console.log(file);
    // if (!file) {
    //   return;
    // }
    // const form = new FormData();
    // form.append('file', file);
    //
    // const uploadData = await axios.post(
    //   `${process.env.REACT_APP_API_ENDPOINT}/api/v1/upload`,
    //   form,
    //   getUserData().config,
    // );
    // setFile_Url(uploadData.data.imageUrl);
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
          accept="image/jpeg,image/png,image/gif,image/webp"
          hidden
          onChange={handlerUpload}
        />
        <div className="editProfile__content-avatarContainer">
          <label htmlFor="imageInput" className="editProfile__content-camera-wrapper">
            <img src={camera} alt="camera" className="editProfile__content-camera" />
          </label>
          <img src={avatar} className="editProfile__content-avatar" alt="upload_image" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
