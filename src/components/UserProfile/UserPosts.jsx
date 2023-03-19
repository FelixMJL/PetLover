import '../RecommendForYou/post/post.css';
import moment from 'moment';
import React from 'react';
import UserPost from './post/UserPost';
import DeletePost from '../DeletePost/DeletePost';

const UserPosts = ({ posts, username, nickname, avatar, id, currentUserId }) => (
  <div className="userPosts">
    {posts &&
      posts.map((post) => (
        <div key={post._id} className="post_container">
          <div className="post_inner-container">
            <img src={avatar} className="post_avatar" alt="avatar" />
            <div className="post_content-container">
              <div className="post_info-container">
                <div className="post_author-info-container">
                  <span className="post_author-nick-name">{nickname}</span>
                  <span className="post_author-user-name">@{username}</span>
                  <div className="post_time">
                    {/* Use post.created_at instead of created_at */}
                    <span>· {moment(post.created_at).fromNow()}</span>
                  </div>
                </div>
                <div>{id === currentUserId ? <DeletePost postId={post._id} /> : ''}</div>
              </div>
              <UserPost {...post} />
            </div>
          </div>
        </div>
      ))}
  </div>
);

export default UserPosts;
