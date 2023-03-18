import './RecommendForYou.css';
import React, { useState, useEffect } from 'react';
import Post from './post/post';
import { getAllPosts } from '../../services/getAllPosts';
import loading from '../../assets/loading.svg';
import post_icon from '../../assets/post_icon.svg';

const RecommendForYou = () => {
  const [posts, setPosts] = useState([]);

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
  return (
    <div>
      <div className="post__wrapper">
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
