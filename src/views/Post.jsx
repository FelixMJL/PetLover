import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from '../services/getUserData';
import SinglePost from '../components/SinglePost/SinglePost';

const Post = () => {
  const { postId } = useParams();
  const currentUserId = getUserData().id;

  return (
    <div>
      <SinglePost postId={postId} currentUserId={currentUserId} />
    </div>
  );
};

export default Post;
