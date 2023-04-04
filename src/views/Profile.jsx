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
  const [isCurrentUser, setIsCurrentUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const { id } = useParams();

  const mainUserId = getUserData().id;
  const [userData, setUserData] = useState(0);
  const [currentUserData, setCurrentUserData] = useState(0);
  const [mainUserData, setMainUserData] = useState(0);
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

  const getMainUser = () =>
    axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${mainUserId}`,
      getUserData().config,
    );
  useEffect(() => {
    // eslint-disable-next-line consistent-return,no-shadow
    const getMainUserData = async () => {
      try {
        const user = await getMainUser();
        setMainUserData(user.data);
      } catch (error) {
        return error.message;
      }
    };
    getMainUserData();
  }, []);

  const getCurrentUser = () =>
    axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${getUserData().id}`,
      getUserData().config,
    );
  useEffect(() => {
    // eslint-disable-next-line consistent-return,no-shadow
    const getUserData = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserData(user.data);
      } catch (error) {
        return error.message;
      }
    };
    getUserData();
  }, []);

  const { posts, nickname, introduction, avatar, location, website_url } = userData;
  const [updatedNickname, setUpdatedNickname] = useState(() => nickname);
  const [updatedIntroduction, setUpdatedIntroduction] = useState(() => introduction);
  const [updatedAvatar, setUpdatedAvatar] = useState(() => avatar);
  const [updatedLocation, setUpdatedLocation] = useState(() => location);
  const [updatedWebsiteUrl, setUpdatedWebsiteUrl] = useState(() => website_url);

  useEffect(() => {
    if (!userData) {
      return;
    }
    setUpdatedNickname(nickname);
    setUpdatedIntroduction(introduction);
    setUpdatedAvatar(avatar);
    setUpdatedLocation(location);
    setUpdatedWebsiteUrl(website_url);
  }, [userData]);

  const followingUsers = currentUserData?.following;

  useEffect(() => {
    if (getUserData().id === id) {
      setIsCurrentUser(true);
      return;
    }
    if (followingUsers?.includes(id)) {
      setIsFollowing(true);
      return;
    }
    setIsFollowing(false);
  }, [followingUsers]);

  return (
    <div>
      {showEditProfile && (
        <EditProfile
          setShowEditProfile={setShowEditProfile}
          updatedNickname={updatedNickname}
          updatedIntroduction={updatedIntroduction}
          updatedAvatar={updatedAvatar}
          updatedLocation={updatedLocation}
          updatedWebsiteUrl={updatedWebsiteUrl}
          setUpdatedNickname={setUpdatedNickname}
          setUpdatedIntroduction={setUpdatedIntroduction}
          setUpdatedAvatar={setUpdatedAvatar}
          setUpdatedLocation={setUpdatedLocation}
          setUpdatedWebsiteUrl={setUpdatedWebsiteUrl}
          {...userData}
        />
      )}
      <UserInfo
        id={id}
        setShowEditProfile={setShowEditProfile}
        updatedNickname={updatedNickname}
        updatedIntroduction={updatedIntroduction}
        updatedAvatar={updatedAvatar}
        updatedLocation={updatedLocation}
        updatedWebsiteUrl={updatedWebsiteUrl}
        isFollowing={isFollowing}
        isCurrentUser={isCurrentUser}
        setIsFollowing={setIsFollowing}
        {...userData}
      />
      <UserPosts
        posts={posts}
        id={id}
        updatedNickname={updatedNickname}
        mainUserId={mainUserId}
        updatedAvatar={updatedAvatar}
        {...userData}
        user={userData}
        mainUserData={mainUserData}
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
      {isCurrentUser && (
        <div className="post__wrapper" onClick={postClickHandler}>
          <img src={post_icon} alt="post_icon" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
