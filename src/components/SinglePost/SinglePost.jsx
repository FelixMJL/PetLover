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

const SinglePost = ({
  showSinglePost,
  setShowSinglePost,
  author,
  content,
  comments,
  created_at,
  _id,
  postData,
  setPostData,
  currentUserId,
  imageUrl,
  videoUrl,
}) => {
  // const [allComment, setAllComment] = useState([]);
  // const [commentData, setCommentData] = useState([]);

  // useEffect(() => {
  //   const getCommentData = async () => {
  //     try {
  //       const comment = await comments.map((commentId) =>
  //         axios.get(
  //           `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments/${commentId}`,
  //           getUserData().config,
  //         ),
  //       );
  //       setAllComment(comment.data);
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.log(error.message);
  //     }
  //   };
  //   getCommentData();
  // }, []);

  // useEffect(() => {
  //   setCommentData(allComment);
  // }, [allComment]);
  // const commentData = comments.map((commentId) =>
  //   axios.get(
  //     `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments/${commentId}`,
  //     getUserData().config,
  //   ),
  // );

  // const getCommentData = async () => {
  //   const commentData = await comments.map((commentId) =>
  //     axios.get(
  //       `${process.env.REACT_APP_API_ENDPOINT}/api/v1/comments/${commentId}`,
  //       getUserData().config,
  //     ),
  //   );
  //   console.log(commentData);
  // };

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

  // const { comments: commentData } = singlePostData;

  if (!showSinglePost) return null;
  return (
    <div className="singlePost_container">
      <div className="singlePost_content">
        <div className="singlePost_content-header">
          <img className="singlePost_btn-back" src={back} alt="back" onClick={setShowSinglePost} />
          <span>Post</span>
        </div>
        <div className="singlePost_inner-container">
          <div className="singlePost_author-info-container">
            <img src={author.avatar} className="singlePost_avatar" alt="avatar" />
            <div className="singlePost_author-names-container">
              <div className="singlePost_author-nick-name">{author.nickname}</div>
              <div className="singlePost_author-user-name">@{author.username}</div>
            </div>
            <div>
              {author.id === currentUserId ? (
                <DeletePost postId={_id} setPostData={setPostData} postData={postData} />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="singlePost_content-container">
            {content && (
              <div className="singlePost_content-text">
                <p>{content}</p>
              </div>
            )}
            {imageUrl && (
              <img src={imageUrl} className="singlePost_content-image" alt="Content img" />
            )}
            {videoUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video className="singlePost_content-video" controls autoPlay loop muted>
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}
            <div className="singlePost_time">
              <span>{created_at}</span>
            </div>
            <div className="singlePost_comments">
              <img src={replyLogo} alt="replyLogo" className="singlePost_comments-replyLogo" />
              <span className="singlePost_comments-count">{comments.length}</span>
            </div>
          </div>
          <div>
            <img src={author.avatar} className="singlePost_avatar" alt="avatar" />
            <input placeholder="Tweet your reply" />
            <button type="submit">Reply</button>
          </div>
          <div className="singlePost_comments-container">
            <div className="post_author-info-container">
              <img
                src={author.avatar}
                className="singlePost_avatar"
                alt="avatar"
                // // eslint-disable-next-line no-console
                // onClick={() => {
                //   // eslint-disable-next-line no-console
                //   console.log(singlePostData);
                //   // eslint-disable-next-line no-console
                //   // eslint-disable-next-line no-console
                //   singlePostData.comments.map((comment) => console.log(comment.comment));
                // }}
              />
              <span className="post_author-nick-name">{author.nickname}</span>
              <span className="post_author-user-name">@{author.username}</span>
              <div className="post_time">
                <span>· {moment(created_at).fromNow()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="userComments">
          {singlePostData.comments &&
            singlePostData.comments.map((commentData) => (
              <div key={commentData._id} className="post_container">
                <div className="post_inner-container">
                  <img src={commentData.author.avatar} className="post_avatar" alt="avatar" />
                  <div className="post_content-container">
                    <div className="post_info-container">
                      <div className="post_author-info-container">
                        <span className="post_author-nick-name">{commentData.author.nickname}</span>
                        <span className="post_author-user-name">
                          @{commentData.author.username}
                        </span>
                        <div className="post_time">
                          {/* Use post.created_at instead of created_at */}
                          <span>· {moment(commentData.created_at).fromNow()}</span>
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
                        <img src={replyLogo} alt="replyLogo" className="post_comments-replyLogo" />
                        <span className="post_comments-count">{comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
