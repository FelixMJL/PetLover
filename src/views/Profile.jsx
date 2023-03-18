import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../components/UserProfile/UserInfo';
import UserPosts from '../components/UserProfile/UserPosts';
import { getUserData } from '../services/getUserData';
import Footer from '../components/Footer/Footer';
import post_icon from '../assets/post_icon.svg';

const Profile = () => {
  const { id } = useParams();
  const currentUserId = getUserData().id;
  const [userData, setUserData] = useState(0);
  const getUser = () =>
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${id}`, getUserData().config);
  useEffect(() => {
    // eslint-disable-next-line consistent-return,no-shadow
    const getUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
      } catch (error) {
        return error.message;
      }
    };
    getUserData();
  }, []);

  const { posts } = userData;

  return (
    <div>
      <UserInfo {...userData} />
      <UserPosts posts={posts} id={id} currentUserId={currentUserId} {...userData} />
      <div className="post__wrapper">
        <img src={post_icon} alt="post_icon" />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
