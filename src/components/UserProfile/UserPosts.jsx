import '../RecommendForYou/post/PostContent.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserPost from './post/UserPost';
import DeletePost from '../DeletePost/DeletePost';

const UserPosts = ({ posts, username, nickname, avatar, id, currentUserId }) => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  return (
    <div className="post_profile-post-container">
      {postData &&
        postData.map((post) => (
          <div key={post._id} className="post_container">
            <Link className="post_inner-container" to={`/post/${post._id}`}>
              <img src={avatar} className="post_avatar" alt="avatar" />
              <div className="post_content-container">
                <div className="post_info-container">
                  <div className="post_author-info-container">
                    <span className="post_author-nick-name">{nickname}</span>
                    <span className="post_author-user-name">@{username}</span>
                    <div className="post_time">
                      <span>· {moment(post.created_at).fromNow()}</span>
                    </div>
                  </div>
                </div>
                <UserPost {...post} />
              </div>
            </Link>
            <div>
              {id === currentUserId ? (
                <DeletePost setPostData={setPostData} postData={postData} postId={post._id} />
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
