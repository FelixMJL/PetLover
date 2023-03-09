import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../components/UserProfile/UserInfo';
import UserPosts from '../components/UserProfile/UserPosts';
import { getUserData } from '../services/getUserData';

const Profile = () => {
  const { id } = useParams();
  const currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  const [userData, setUserData] = useState(0);
  const getUser = () => axios.get(`http://localhost:8080/api/v1/users/${id}`, getUserData().config);
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const getUserData = async () => {
      try {
        const user = await getUser();
        setUserData(user.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    };
    getUserData();
  }, []);

  const { posts } = userData;

  return (
    <div>
      <UserInfo {...userData} />
      <UserPosts posts={posts} id={id} currentUserId={currentUserId} {...userData} />
    </div>
  );
};

export default Profile;
