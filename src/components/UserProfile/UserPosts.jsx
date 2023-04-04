import '../RecommendForYou/post/PostContent.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import UserPost from './post/UserPost';
import DeleteItem from '../DeletePost/DeleteItem';
import SendComment from '../SendComment/SendComment';
// import { getUserData } from '../../services/getUserData';

const UserPosts = ({
  posts,
  username,
  updatedNickname,
  updatedAvatar,
  id,
  mainUserId,
  user,
  mainUserData,
}) => {
  const [postData, setPostData] = useState(null);
  const [showSendComment, setShowSendComment] = useState(false);

  const commentClickHandler = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSendComment(postId);
  };

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  return (
    <div className="post_profile-post-container">
      {postData &&
        postData.map((post) => (
          <div key={post._id} className="post_container">
            <Link className="post_inner-container" to={`/post/${post._id}`}>
              <img src={updatedAvatar} className="post_avatar" alt="avatar" />
              <div className="post_content-container">
                <div className="post_info-container">
                  <div className="post_author-info-container">
                    <span className="post_author-nick-name">{updatedNickname}</span>
                    <span className="post_author-user-name">@{username}</span>
                    <div className="post_time">
                      <span>· {moment(post.created_at).fromNow()}</span>
                    </div>
                  </div>
                </div>
                <UserPost {...post} postId={post._id} commentClickHandler={commentClickHandler} />
              </div>
            </Link>
            <SendComment
              postAuthor={user}
              postContent={post.content}
              postFile_type={post.file_type}
              postFile_url={post.file_url}
              comments={post.comments}
              postCreated_at={post.created_at}
              postId={post._id}
              currentUserData={mainUserData}
              setShowSendComment={setShowSendComment}
              showSendComment={showSendComment === post._id}
            />
            <div>
              {id === mainUserId ? (
                <DeleteItem setPostData={setPostData} postData={postData} postId={post._id} />
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserPosts;
