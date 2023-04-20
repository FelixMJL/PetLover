import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from '../services/getUserData';
import SingleReply from '../components/SingleReply/SingleReply';

const Reply = () => {
  const { replyId } = useParams();
  const currentUserId = getUserData().id;

  return (
    <div>
      <SingleReply replyId={replyId} currentUserId={currentUserId} />
    </div>
  );
};

export default Reply;
