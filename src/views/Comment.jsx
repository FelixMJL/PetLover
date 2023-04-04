import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from '../services/getUserData';
import SingleComment from '../components/SingleComment/SingleComment';

const Comment = () => {
  const { commentId } = useParams();
  const currentUserId = getUserData().id;

  return (
    <div>
      <SingleComment commentId={commentId} currentUserId={currentUserId} />
    </div>
  );
};

export default Comment;
