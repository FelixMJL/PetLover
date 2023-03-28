import '../RecommendForYou/post/PostContent.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import UserPost from './post/UserPost';
import DeletePost from '../DeletePost/DeletePost';
import SinglePost from '../SinglePost/SinglePost';

const UserPosts = ({ posts, username, nickname, avatar, id, currentUserId }) => {
  const [postData, setPostData] = useState(null);
  const [showSinglePost, setShowSinglePost] = useState(false);

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  return (
    <div className="post_profile-post-container">
      {postData &&
        postData.map((post) => (
          <div key={post._id} className="post_container" onClick={() => setShowSinglePost(true)}>
            <div className="post_inner-container">
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
                  <div>
                    {id === currentUserId ? (
                      <DeletePost setPostData={setPostData} postData={postData} postId={post._id} />
                    ) : (
                      ''
                    )}
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
              postData={post}
              setPostData={setPostData}
              currentUserId={currentUserId}
              imageUrl={post.imageUrl}
              videoUrl={post.videoUrl}
            />
          </div>
        ))}
    </div>
  );
};

export default UserPosts;
