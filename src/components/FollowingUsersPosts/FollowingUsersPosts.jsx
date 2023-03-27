import React, { useState, useEffect } from 'react';
import '../RecommendForYou/post/post.css';
import moment from 'moment';
import { getFollowing } from '../../services/getFollowing';
import loading from '../../assets/loading.svg';
import UserPost from '../UserProfile/post/UserPost';
import post_icon from '../../assets/post_icon.svg';
import SendPost from '../SendPost/SendPost';
import SinglePost from '../SinglePost/SinglePost';

const FollowingUsersPosts = ({ user }) => {
  const [postData, setPostData] = useState([]);
  const [showSendPost, setShowSendPost] = useState(false);
  const [showSinglePost, setShowSinglePost] = useState(false);

  const postClickHandler = () => {
    setShowSendPost(true);
  };
  const [status, setStatus] = useState(loading);
  useEffect(() => {
    const getPostData = async () => {
      const post = await getFollowing();
      if (!post.data.length) {
        setStatus('no-posts');
        return;
      }
      setStatus('posts');
      const filteredPosts = post.data.filter((item) => item.author !== null);
      setPostData(filteredPosts);
    };
    getPostData();
  }, []);

  function DataList({ posts }) {
    const list = posts.map((post) => (
      <div className="following_post-container">
        <div key={post._id}>
          <div className="post_container" onClick={() => setShowSinglePost(true)}>
            <div className="post_inner-container">
              <img className="post_avatar" src={post.author.avatar} alt="" />
              <div className="post-content-container">
                <div className="post_author-info-container">
                  <span className="post_author-nick-name">{post.author.nickname}</span>
                  <span className="post_author-user-name">@{post.author.username}</span>
                  <div className="post_time">
                    <span>·{moment(post.created_at).fromNow()}</span>
                  </div>
                </div>
                <UserPost {...post} />
              </div>
            </div>
            <SinglePost
              showSinglePost={showSinglePost}
              setShowSinglePost={() => {
                setShowSinglePost(false);
              }}
              _id={post._id}
              imageUrl={post.imageUrl}
              videoUrl={post.videoUrl}
            />
          </div>
        </div>
      </div>
    ));
    return <ul className="post_ul">{list}</ul>;
  }

  if (status === loading) {
    return (
      <div className="loading following-loading">
        <img src={loading} alt="loading" />
      </div>
    );
  }

  if (status === 'posts') {
    return (
      <>
        <div>
          {showSendPost && (
            <SendPost
              className="sendPost"
              user={user}
              setShowSendPost={setShowSendPost}
              posts={postData}
              setPosts={setPostData}
            />
          )}
          <div className="post__wrapper" onClick={postClickHandler}>
            <img src={post_icon} alt="post_icon" />
          </div>
          <DataList posts={Array.from(postData)} />
        </div>
        <div className="foot-space" />
      </>
    );
  }

  return (
    <div className="following-error-message__wrapper">
      <p className="following-error-message">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        There's no posts here. Please follow some users first.
      </p>
    </div>
  );
};

export default FollowingUsersPosts;
