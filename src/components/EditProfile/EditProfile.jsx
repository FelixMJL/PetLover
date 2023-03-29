import React, { useEffect, useState } from 'react';
import './EditProfile.css';
// import axios from 'axios';
import Footer from '../Footer/Footer';
import back from '../../assets/left-arrow.png';
import camera from '../../assets/camera.svg';
import ImageCropper from './ImageCropper/ImageCropper';
// import { getUserData } from '../../services/getUserData';

const EditProfile = ({ setShowEditProfile, avatar }) => {
  // const [file_url, setFile_Url] = useState(avatar);
  const [imageSelected, setImageSeleted] = useState(null);
  const [imageArea, setImageArea] = useState(null);
  const [imgAfterCrop, setImgAfterCrop] = useState('');
  const backClickHandler = () => {
    setShowEditProfile(false);
  };
  const handlerUpload = async (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // eslint-disable-next-line func-names
    reader.onload = function () {
      setImageSeleted(reader.result);
    };
  };

  const drawImage = () => {
    if (!imageArea) return;

    const canvasEle = document.createElement('canvas');
    canvasEle.width = imageArea.width;
    canvasEle.height = imageArea.height;
    const context = canvasEle.getContext('2d');
    const imageObj1 = new Image();
    imageObj1.src = imageSelected;
    // eslint-disable-next-line func-names
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imageArea.x,
        imageArea.y,
        imageArea.width,
        imageArea.height,
        0,
        0,
        imageArea.width,
        imageArea.height,
      );
      const dataURL = canvasEle.toDataURL('image/jpeg');
      setImgAfterCrop(dataURL);
    };
  };
  useEffect(() => {
    drawImage();
  }, [imageArea, imageSelected]);

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
  let croppedFile = null;
  if (imgAfterCrop) {
    croppedFile = dataURLtoFile(imgAfterCrop, 'cropped-image.jpeg');
    // eslint-disable-next-line no-console
    console.log(croppedFile);
  }

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
      <ImageCropper imageSelected={imageSelected} setImageArea={setImageArea} />
      <Footer />
    </div>
  );
};

export default EditProfile;
