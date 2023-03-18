import React, { useState } from 'react';
import './SendPost.css';
import axios from 'axios';
import image_icon from '../../assets/icon-image.svg';
import back from '../../assets/left-arrow.png';
import { getUserData } from '../../services/getUserData';
// import { getUserData } from '../../services/getUserData';

const SendPost = ({ user }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const handlerUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploaded(true);
    }
    const form = new FormData();
    form.append('image', file);

    const uploadData = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/upload`,
      form,
      getUserData().config,
    );
    if (file.type !== 'video/mp4') {
      setImageUrl(uploadData.data.imageUrl);
      return;
    }
    setVideoUrl(uploadData.data.imageUrl);
  };
  return (
    <div className="sendPost">
      <div className="sendPost__content">
        <div className="sendPost__content-header">
          <img className="sendPost_back" src={back} alt="" />
          <div>Post</div>
        </div>
        <div className="sendPost__content-body">
          <img className="sendPost_avatar" src={user.avatar} alt="" />
          <div className="sendPost__content-wrapper">
            <textarea placeholder="What to enjoy?" rows="5" />
            <input
              id="imageInput"
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handlerUpload}
              disabled={isUploaded}
            />
            {imageUrl && <img src={imageUrl} className="post_content-image" alt="Content img" />}
            {videoUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video className="post_content-video" controls autoPlay loop muted>
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}

            <label htmlFor="imageInput">
              <img className="upload_image" src={image_icon} alt="upload_image" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPost;
