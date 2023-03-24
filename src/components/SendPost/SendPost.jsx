import React, { useEffect, useState } from 'react';
import './SendPost.css';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RxCross2 } from 'react-icons/rx';
import image_icon from '../../assets/icon-image.svg';
import loading_icon from '../../assets/loading.svg';
import back from '../../assets/left-arrow.png';
import { getUserData } from '../../services/getUserData';
import Footer from '../Footer/Footer';

const SendPost = ({ user, setShowSendPost, setPosts, posts }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [file_type, setFile_Type] = useState('');
  const [file_url, setFile_Url] = useState('');
  const [isValidPost, setIsValidPost] = useState(false);
  const [isUpLoading, setIsUpLoading] = useState(false);

  const backClickHandler = () => {
    setShowSendPost(false);
  };
  const author = user.id || '';

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };
  // eslint-disable-next-line no-unused-vars
  const deleteHandler = () => {
    setIsUploaded(false);
    setIsValidPost(false);
    setIsUpLoading(false);
    setImageUrl('');
    setVideoUrl('');
  };
  const handlerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setFile_Type(file.type);
    if (file) {
      setIsUploaded(true);
      setIsUpLoading(true);
    }
    const form = new FormData();
    form.append('file', file);

    const uploadData = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/upload`,
      form,
      getUserData().config,
    );

    setFile_Url(uploadData.data.imageUrl);
    if (!file.type.includes('video')) {
      setImageUrl(uploadData.data.imageUrl);
      setIsUpLoading(false);
      return;
    }
    setVideoUrl(uploadData.data.imageUrl);
    setIsUpLoading(false);
  };
  useEffect(() => {
    if (content || file_url) {
      setIsValidPost(true);
    } else {
      setIsValidPost(false);
    }
  }, [content, file_url]);

  const post = async () => {
    try {
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
      if (response.status === 201) {
        setPosts([
          {
            author: {
              avatar: user.avatar,
              id: user.id,
              nickname: user.nickname,
              username: user.username,
            },
            comments: [],
            content,
            create_at: new Date(),
            file_type,
            file_url,
            _id: '',
          },
          ...posts,
        ]);
        setShowSendPost(false);
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in post function:', error);
    }
  };

  return (
    <div className="sendPost">
      <div className="sendPost__content">
        <div className="sendPost__content-header">
          <img className="btn btn-back" src={back} alt="back" onClick={backClickHandler} />
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            className={`sendPost_post ${isValidPost ? 'sendPost_post-active' : ''}`}
            onClick={post}
            disabled={!isValidPost}
          >
            Post
          </button>
        </div>
        <div className="sendPost__content-body">
          <img className="sendPost_avatar" src={user.avatar} alt="" />
          <div className="sendPost__content-wrapper">
            <textarea placeholder="What to enjoy?" rows="5" onChange={contentChangeHandler} />
            <input
              id="imageInput"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,video/*"
              hidden
              onChange={handlerUpload}
              disabled={isUploaded}
            />
            <div className="loading_icon-wrapper">
              {isUpLoading && (
                <img className="loading_icon" src={loading_icon} alt="loading_icon" />
              )}
            </div>
            {imageUrl && !isUpLoading ? (
              <div className="uploadImgBox">
                <div className="closeIconWrapper">
                  <RxCross2 className="closeIcon" alt="close_icon" onClick={deleteHandler} />
                </div>
                <img src={imageUrl} className="post_content-image" alt="Content img" />
              </div>
            ) : null}
            {videoUrl && !isUpLoading ? (
              <div className="uploadVideoBox">
                <div className="closeIconWrapper">
                  <RxCross2 className="closeIcon" alt="close_icon" onClick={deleteHandler} />
                </div>
                <video className="post_content-video" controls autoPlay loop muted>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : null}

            <label htmlFor="imageInput">
              <img className="upload_image" src={image_icon} alt="upload_image" />
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SendPost;
