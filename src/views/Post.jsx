// import React, { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import UserInfo from '../components/UserProfile/UserInfo';
// import UserPosts from '../components/UserProfile/UserPosts';
import { getUserData } from '../services/getUserData';
// import Footer from '../components/Footer/Footer';
// import post_icon from '../assets/post_icon.svg';
// import SendPost from '../components/SendPost/SendPost';
// import EditProfile from '../components/EditProfile/EditProfile';
import SinglePost from '../components/SinglePost/SinglePost';

const Post = () => {
  const { postId } = useParams();
  const currentUserId = getUserData().id;

  // // eslint-disable-next-line no-console
  // console.log('postId', postId);
  // // eslint-disable-next-line no-console
  // console.log('currentUserId', currentUserId);

  return (
    <div>
      <SinglePost _id={postId} currentUserId={currentUserId} />
    </div>
  );
};

export default Post;
