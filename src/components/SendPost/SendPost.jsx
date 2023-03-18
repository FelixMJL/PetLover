import React, { useState } from 'react';
import './SendPost.css';
import axios from 'axios';
import image_icon from '../../assets/icon-image.svg';
import back from '../../assets/left-arrow.png';
import { getUserData } from '../../services/getUserData';

const SendPost = ({ user, setShowSendPost }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [file_type, setFile_Type] = useState('');
  const [file_url, setFile_Url] = useState('');
  const backClickHandler = () => {
    setShowSendPost(false);
  };
  const author = user.id || '';

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const handlerUpload = async (e) => {
    const file = e.target.files[0];
    setFile_Type(file.type);
    if (file) {
      setIsUploaded(true);
    }
    const form = new FormData();
    form.append('file', file);

    const uploadData = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/upload`,
      form,
      getUserData().config,
    );
    setFile_Url(uploadData.data.imageUrl);
    if (file.type !== 'video/mp4') {
      setImageUrl(uploadData.data.imageUrl);
      return;
    }
    setVideoUrl(uploadData.data.imageUrl);
  };

  const post = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts`,
      {
        author,
        content,
        file_type,
        file_url,
      },
      getUserData().config,
    );
    // eslint-disable-next-line no-console
    if (response.status === 201) {
      setShowSendPost(false);
    }
  };

  return (
    <div className="sendPost">
      <div className="sendPost__content">
        <div className="sendPost__content-header">
          <img className="sendPost_back" src={back} alt="back" onClick={backClickHandler} />
          <div onClick={post}>Post</div>
        </div>
        <div className="sendPost__content-body">
          <img className="sendPost_avatar" src={user.avatar} alt="" />
          <div className="sendPost__content-wrapper">
            <textarea placeholder="What to enjoy?" rows="5" onChange={contentChangeHandler} />
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
