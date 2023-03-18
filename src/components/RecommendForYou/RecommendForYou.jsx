import './RecommendForYou.css';
import React, { useState, useEffect } from 'react';
import Post from './post/post';
import { getAllPosts } from '../../services/getAllPosts';
import loading from '../../assets/loading.svg';
import post_icon from '../../assets/post_icon.svg';
import SendPost from '../SendPost/SendPost';

const RecommendForYou = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [showSendPost, setShowSendPost] = useState(false);

  const postClickHandler = () => {
    setShowSendPost(true);
  };

  useEffect(() => {
    const getPostData = async () => {
      try {
        const post = await getAllPosts();
        setPosts(post.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getPostData();
  }, []);
  // eslint-disable-next-line no-console
  console.log(posts);
  return (
    <div>
      {showSendPost && (
        <SendPost className="sendPost" user={user} setShowSendPost={setShowSendPost} />
      )}
      <div className="post__wrapper" onClick={postClickHandler}>
        <img src={post_icon} alt="post_icon" />
      </div>
      {posts.length ? (
        posts.map((post) => (
          <div key={post._id}>
            <Post {...post} />
          </div>
        ))
      ) : (
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );
};

export default RecommendForYou;
