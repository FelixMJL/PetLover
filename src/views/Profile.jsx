import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../components/UserProfile/UserInfo';
import UserPosts from '../components/UserProfile/UserPosts';
import { getUserData } from '../services/getUserData';
import Footer from '../components/Footer/Footer';
import post_icon from '../assets/post_icon.svg';
import SendPost from '../components/SendPost/SendPost';
import EditProfile from '../components/EditProfile/EditProfile';

const Profile = () => {
  const { id } = useParams();
  const currentUserId = getUserData().id;
  const [userData, setUserData] = useState(0);
  const [currentUserData, setCurrentUserData] = useState(0);
  const [showSendPost, setShowSendPost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const postClickHandler = () => {
    setShowSendPost(true);
  };

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

  const getCurrentUser = () =>
    axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${currentUserId}`,
      getUserData().config,
    );
  useEffect(() => {
    // eslint-disable-next-line consistent-return,no-shadow
    const getCurrentUserData = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserData(user.data);
      } catch (error) {
        return error.message;
      }
    };
    getCurrentUserData();
  }, []);

  const { posts } = userData;

  return (
    <div>
      {showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} {...userData} />}
      <UserInfo setShowEditProfile={setShowEditProfile} {...userData} />
      <UserPosts
        posts={posts}
        id={id}
        currentUserId={currentUserId}
        {...userData}
        user={userData}
        currentUserData={currentUserData}
      />
      {showSendPost && (
        <SendPost
          className="sendPost"
          user={userData}
          setShowSendPost={setShowSendPost}
          posts={posts}
          setPosts={setUserData}
        />
      )}
      <div className="post__wrapper" onClick={postClickHandler}>
        <img src={post_icon} alt="post_icon" />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
