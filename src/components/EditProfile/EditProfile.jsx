import React, { useState } from 'react';
import './EditProfile.css';
import axios from 'axios';
import Footer from '../Footer/Footer';
import back from '../../assets/left-arrow.png';
import camera from '../../assets/camera.svg';
import ImageCropper from './ImageCropper/ImageCropper';
import { getUserData } from '../../services/getUserData';

const EditProfile = ({ setShowEditProfile, avatar }) => {
  const [file_url, setFile_Url] = useState(avatar);
  const [imageSelected, setImageSeleted] = useState(null);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const backClickHandler = () => {
    setShowEditProfile(false);
  };

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handlerUpload = async (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // eslint-disable-next-line func-names
    reader.onload = function () {
      setImageSeleted(reader.result);
    };
    setShowImageCropper(true);
    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  };

  const cropClickHandler = async (croppedArea) => {
    const drawImage = async () => {
      if (!croppedArea) return;
      const canvasEle = document.createElement('canvas');
      canvasEle.width = croppedArea.width;
      canvasEle.height = croppedArea.height;
      const context = canvasEle.getContext('2d');
      const imageObj1 = new Image();
      imageObj1.src = imageSelected;
      imageObj1.onload = async function loadImage() {
        context.drawImage(
          imageObj1,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height,
        );
        const dataURL = canvasEle.toDataURL('image/jpeg');
        const croppedFile = dataURLtoFile(dataURL, 'cropped-image.jpeg');

        if (!croppedFile) {
          return;
        }
        const form = new FormData();
        form.append('file', croppedFile);

        const uploadData = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/upload`,
          form,
          getUserData().config,
        );
        setFile_Url(uploadData.data.imageUrl);

        setShowImageCropper(false);
      };
    };
    await drawImage();
  };

  return (
    <div className="editProfile">
      {showImageCropper && (
        <ImageCropper imageSelected={imageSelected} cropClickHandler={cropClickHandler} />
      )}
      <div className="editProfile-wrapper">
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
            <img src={file_url} className="editProfile__content-avatar" alt="upload_image" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
