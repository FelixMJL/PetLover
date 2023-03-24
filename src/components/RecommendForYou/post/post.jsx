import './post.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DeletePost from '../../DeletePost/DeletePost';
import replyLogo from '../../../assets/reply.png';
import { getUserData } from '../../../services/getUserData';
import SinglePost from '../../SinglePost/SinglePost';

const Post = ({
  author,
  content,
  file_type,
  file_url,
  comments,
  created_at,
  _id,
  postData,
  setPostData,
}) => {
  const currentUserId = getUserData().id;
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showSinglePost, setShowSinglePost] = useState(false);

  useEffect(() => {
    if (!file_type) {
      return;
    }
    if (file_type.includes('image')) {
      setImageUrl(file_url);
      return;
    }
    if (file_type.includes('video')) {
      setVideoUrl(file_url);
    }
  }, []);

  return (
    <>
      <div className="post_container" onClick={() => setShowSinglePost(true)}>
        <div className="post_inner-container">
          <img src={author.avatar} className="post_avatar" alt="avatar" />
          <div className="post_content-container">
            <div className="post_info-container">
              <div className="post_author-info-container">
                <span className="post_author-nick-name">{author.nickname}</span>
                <span className="post_author-user-name">@{author.username}</span>
                <div className="post_time">
                  <span>· {moment(created_at).fromNow()}</span>
                </div>
              </div>
              <div>
                {author.id === currentUserId ? (
                  <DeletePost postId={_id} setPostData={setPostData} postData={postData} />
                ) : (
                  ''
                )}
              </div>
            </div>

            {content && (
              <div className="post_content-text">
                <p>{content}</p>
              </div>
            )}
            {imageUrl && <img src={imageUrl} className="post_content-image" alt="Content img" />}
            {videoUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video className="post_content-video" controls autoPlay loop muted>
                <source src={videoUrl} type="video/mp4" />
              </video>
            )}
            <div className="post_comments">
              <img src={replyLogo} alt="replyLogo" className="post_comments-replyLogo" />
              <span className="post_comments-count">{comments.length}</span>
            </div>
          </div>
        </div>
      </div>
      <SinglePost
        showSinglePost={showSinglePost}
        setShowSinglePost={() => {
          setShowSinglePost(false);
        }}
        author={author}
        content={content}
        comments={comments}
        created_at={created_at}
        _id={_id}
        postData={postData}
        setPostData={setPostData}
        currentUserId={currentUserId}
        imageUrl={imageUrl}
        videoUrl={videoUrl}
      />
    </>
  );
};
export default Post;
