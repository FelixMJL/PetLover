import React, { useState, useEffect } from 'react';
// import React from 'react';
import './SinglePost.css';
import moment from 'moment';
import axios from 'axios';
import { getUserData } from '../../services/getUserData';
import DeletePost from '../DeletePost/DeletePost';
// import UserPost from '../UserProfile/post/UserPost';
// import { getCommentByID } from '../../services/getCommentById';
import back from '../../assets/left-arrow.png';
import replyLogo from '../../assets/reply.png';
import Footer from '../Footer/Footer';

const SinglePost = ({
  showSinglePost,
  setShowSinglePost,
  _id,
  postData,
  setPostData,
  currentUserId,
}) => {
  const [singlePostData, setSinglePostData] = useState();

  useEffect(() => {
    const getSinglePostData = async () => {
      try {
        const getSinglePost = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/v1/posts/${_id}`,
          getUserData().config,
        );

        setSinglePostData(getSinglePost.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getSinglePostData();
  }, []);

  // eslint-disable-next-line no-console
  console.log('singlePostData', singlePostData);

  if (!showSinglePost) return null;
  return (
    <div className="singlePost_container">
      <div className="singlePost_inner-container">
        <div className="singlePost_content-header">
          <img className="singlePost_btn-back" src={back} alt="back" onClick={setShowSinglePost} />
          <span>Post</span>
        </div>
        <div className="singlePost_post-container">
          <div className="singlePost_author-header-container">
            <div className="singlePost_author-info-container">
              <img src={singlePostData.author.avatar} className="singlePost_avatar" alt="avatar" />
              <div className="singlePost_author-names-container">
                <span className="singlePost_author-nick-name">
                  {singlePostData.author.nickname}
                </span>
                <span className="singlePost_author-user-name">
                  @{singlePostData.author.username}
                </span>
                <div className="singlePost_time">
                  <span>· {moment(singlePostData.created_at).fromNow()}</span>
                </div>
              </div>
            </div>
            <div>
              {singlePostData.author.id === currentUserId ? (
                <DeletePost postId={_id} setPostData={setPostData} postData={postData} />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="singlePost_content-container">
            {singlePostData.content && (
              <div className="singlePost_content-text">
                <p>{singlePostData.content}</p>
              </div>
            )}
            {singlePostData.imageUrl && (
              <img
                src={singlePostData.imageUrl}
                className="singlePost_content-image"
                alt="Content img"
              />
            )}
            {singlePostData.videoUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video className="singlePost_content-video" controls autoPlay loop muted>
                <source src={singlePostData.videoUrl} type="video/mp4" />
              </video>
            )}
            <div className="singlePost_time">
              <span>{singlePostData.created_at}</span>
            </div>
            <div className="singlePost_comments">
              <img src={replyLogo} alt="replyLogo" className="singlePost_comments-replyLogo" />
              <span className="singlePost_comments-count">{singlePostData.comments.length}</span>
            </div>
          </div>
          <div className="singlePost_reply-post">
            <img src={singlePostData.author.avatar} className="singlePost_avatar" alt="avatar" />
            <input className="singlePost_reply-input" placeholder="Tweet your reply" />
            <button className="singlePost_reply-btn" type="submit">
              Reply
            </button>
          </div>
          <div className="singlePost_user-comments">
            {singlePostData.comments &&
              singlePostData.comments.map((commentData) => (
                <div key={commentData._id} className="post_container">
                  <div className="post_inner-container">
                    <img src={commentData.author.avatar} className="post_avatar" alt="avatar" />
                    <div className="post_content-container">
                      <div className="post_info-container">
                        <div className="post_author-info-container">
                          <span className="post_author-nick-name">
                            {commentData.author.nickname}
                          </span>
                          <span className="post_author-user-name">
                            @{commentData.author.username}
                          </span>
                          <div className="post_time">
                            <span>· {moment(commentData.created_at).fromNow()}</span>
                          </div>
                          <div className="singlePost_replying-to">
                            Replying to{' '}
                            <a className="singlePost_replying-to-user-nick-name" href="none">
                              @{singlePostData.author.nickname}
                            </a>
                          </div>
                        </div>
                        <div>
                          {commentData.author.id === currentUserId ? (
                            <DeletePost
                            // setPostData={setPostData}
                            // postData={postData}
                            // postId={post._id}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="post_content-container">
                        {commentData.comment && (
                          <div className="post_content-text">
                            <p>{commentData.comment}</p>
                          </div>
                        )}
                        <div className="post_comments">
                          <img
                            src={replyLogo}
                            alt="replyLogo"
                            className="post_comments-replyLogo"
                          />
                          <span className="post_comments-count">{commentData.replies.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SinglePost;
