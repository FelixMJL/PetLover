import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import './EditProfile.css';
import axios from 'axios';
import Footer from '../Footer/Footer';
import back from '../../assets/left-arrow.png';
import camera from '../../assets/camera.svg';
import ImageCropper from './ImageCropper/ImageCropper';
import { getUserData } from '../../services/getUserData';

const EditProfile = ({
  setShowEditProfile,
  setUpdatedNickname,
  setUpdatedIntroduction,
  setUpdatedAvatar,
  setUpdatedLocation,
  setUpdatedWebsiteUrl,
  updatedAvatar,
  updatedNickname,
  updatedIntroduction,
  updatedLocation,
  updatedWebsiteUrl,
}) => {
  const [file_url, setFile_Url] = useState(updatedAvatar);
  const [imageSelected, setImageSeleted] = useState(null);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [details, setDetails] = useState({
    nickname: updatedNickname,
    introduction: updatedIntroduction,
    location: updatedLocation,
    website_url: updatedWebsiteUrl,
  });
  const backClickHandler = () => {
    setUpdatedNickname(updatedNickname);
    setUpdatedIntroduction(updatedIntroduction);
    setUpdatedAvatar(updatedAvatar);
    setUpdatedLocation(updatedLocation);
    setUpdatedWebsiteUrl(updatedWebsiteUrl);
    setShowEditProfile(false);
  };

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n > 0) {
      n -= 1;
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

  const [isNicknameEmpty, setIsNicknameEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if (name === 'nickname') {
      if (value.trim() === '') {
        setIsNicknameEmpty(true);
        setErrorMessage(true);
      } else {
        setIsNicknameEmpty(false);
        setErrorMessage(false);
      }
    }
  };

  const {
    nickname: newNickname,
    introduction: newIntroduction,
    location: newLocation,
    website_url: newWebsite_url,
  } = details;

  const save = () => {
    setUpdatedNickname(newNickname);
    setUpdatedIntroduction(newIntroduction);
    setUpdatedAvatar(file_url);
    setUpdatedLocation(newLocation);
    setUpdatedWebsiteUrl(newWebsite_url);
    setShowEditProfile(false);
  };

  return (
    <div className="editProfile">
      {showImageCropper && (
        <ImageCropper
          imageSelected={imageSelected}
          cropClickHandler={cropClickHandler}
          setShowImageCropper={setShowImageCropper}
        />
      )}
      <div className="editProfile-wrapper">
        <div className="editProfile__header">
          <div className="editProfile__header-title">
            <img className="btn btn-back" src={back} alt="back" onClick={backClickHandler} />
            <div className="editProfile__header-text">Edit Profile</div>
          </div>
          <button
            type="button"
            className={
              isNicknameEmpty
                ? 'editProfile__header-btn editProfile__header-btnError'
                : 'editProfile__header-btn'
            }
            disabled={isNicknameEmpty}
            onClick={save}
          >
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
      <fieldset
        className={
          isNicknameEmpty ? 'editProfile__detail editProfile__detail-error' : 'editProfile__detail'
        }
      >
        <Box as="legend" px={3}>
          Nickname
        </Box>
        <div>
          <input
            name="nickname"
            value={details.nickname}
            onChange={onChangeHandler}
            className="editProfile__detail-box"
          />
        </div>
      </fieldset>

      {errorMessage && (
        <span className="editProfile__detail-nickNameError">Nickname cannot be blank.</span>
      )}

      <fieldset className="editProfile__detail">
        <Box as="legend" px={3}>
          Location
        </Box>
        <div>
          <input
            name="location"
            value={details.location}
            onChange={onChangeHandler}
            className="editProfile__detail-box"
          />
        </div>
      </fieldset>
      <Footer />

      <fieldset className="editProfile__detail">
        <Box as="legend" px={3}>
          Web Site
        </Box>
        <div>
          <input
            name="website_url"
            value={details.website_url}
            onChange={onChangeHandler}
            className="editProfile__detail-box"
          />
        </div>
      </fieldset>

      <fieldset className="editProfile__detail">
        <Box as="legend" px={3}>
          Introduction
        </Box>
        <div>
          <textarea
            name="introduction"
            value={details.introduction}
            onChange={onChangeHandler}
            className="editProfile__detail-box"
            rows={3}
          />
        </div>
      </fieldset>

      <Footer />
    </div>
  );
};

export default EditProfile;
