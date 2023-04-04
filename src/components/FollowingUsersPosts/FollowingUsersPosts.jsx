import React, { useState, useEffect } from 'react';
import '../RecommendForYou/post/PostContent.css';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { getFollowing } from '../../services/getFollowing';
import loading from '../../assets/loading.svg';
import UserPost from '../UserProfile/post/UserPost';
import post_icon from '../../assets/post_icon.svg';
import SendPost from '../SendPost/SendPost';
import SendComment from '../SendComment/SendComment';

const FollowingUsersPosts = ({ user }) => {
  const [postData, setPostData] = useState([]);
  const [showSendPost, setShowSendPost] = useState(false);
  const [showSendComment, setShowSendComment] = useState(null);
  const navigate = useNavigate();

  const postClickHandler = () => {
    setShowSendPost(true);
  };

  const commentClickHandler = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSendComment(postId);
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
      <div key={post._id} className="following_post-container">
        <Link className="post_container" to={`/post/${post._id}`}>
          <div className="post_inner-container">
            <img
              className="post_avatar"
              src={post.author.avatar}
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/profile/${post.author.id}`);
              }}
            />
            <div className="post-content-container">
              <div className="post_author-info-container">
                <span className="post_author-nick-name">{post.author.nickname}</span>
                <span className="post_author-user-name">@{post.author.username}</span>
                <div className="post_time">
                  <span>·{moment(post.created_at).fromNow()}</span>
                </div>
              </div>
              <UserPost {...post} postId={post._id} commentClickHandler={commentClickHandler} />
            </div>
          </div>
        </Link>
        <SendComment
          postAuthor={post.author}
          postContent={post.content}
          postFile_type={post.file_type}
          postFile_url={post.file_url}
          comments={post.comments}
          postCreated_at={post.created_at}
          postId={post._id}
          currentUserData={user}
          setShowSendComment={setShowSendComment}
          showSendComment={showSendComment === post._id}
        />
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
