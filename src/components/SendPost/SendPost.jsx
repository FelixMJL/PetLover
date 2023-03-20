import React, { useEffect, useState } from 'react';
import './SendPost.css';
import axios from 'axios';
import image_icon from '../../assets/icon-image.svg';
import back from '../../assets/left-arrow.png';
import { getUserData } from '../../services/getUserData';

const SendPost = ({ user, setShowSendPost, setPosts, posts }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [file_type, setFile_Type] = useState('');
  const [file_url, setFile_Url] = useState('');
  const [isValidPost, setIsValidPost] = useState(false);
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
          <img className="sendPost_back" src={back} alt="back" onClick={backClickHandler} />
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
