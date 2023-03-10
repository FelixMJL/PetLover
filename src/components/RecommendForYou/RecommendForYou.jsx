import "./RecommendForYou.css";
import React, { useState, useEffect } from "react";
import Post from "./post/post";
import { getAllPosts } from "../../services/getAllPosts";
import loading from "../../assets/loading.svg";

const RecommendForYou = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const post = await getAllPosts();
        setPosts(post.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPostData();
  }, []);
  return (
    <>
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
    </>
  );
};

export default RecommendForYou;
