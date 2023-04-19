import './RecommendForYou.css';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllPosts } from '../../services/getAllPosts';
import loading from '../../assets/loading.svg';
import post_icon from '../../assets/post_icon.svg';
import SendPost from '../SendPost/SendPost';
import PostContent from './post/PostContent';

const RecommendForYou = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState([]);
  const [showSendPost, setShowSendPost] = useState(false);
  const [itemsCount, setItemsCount] = useState(5);

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

  useEffect(() => {
    const filteredPosts = posts.filter((post) => post.author !== null);
    setPostData(filteredPosts);
  }, [posts]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItemsCount(itemsCount + 5);
    }, 2000);
  };

  return (
    <div>
      {showSendPost && (
        <SendPost
          className="sendPost"
          user={user}
          setShowSendPost={setShowSendPost}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      <div className="post__wrapper" onClick={postClickHandler}>
        <img src={post_icon} alt="post_icon" />
      </div>
      <div className="recommend_post-container">
        {postData.length ? (
          <InfiniteScroll
            dataLength={itemsCount}
            next={fetchMoreData}
            hasMore={itemsCount < postData.length}
            loader={<img className="lazy-loading" src={loading} alt="lazy-loading" />}
          >
            {postData.slice(0, itemsCount).map((post) => (
              <div key={post._id}>
                <PostContent
                  {...post}
                  setPostData={setPostData}
                  postData={postData}
                  currentUserData={user}
                />
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className="loading">
            <img src={loading} alt="loading" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendForYou;
