import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FollowingUsersPosts from '../components/FollowingUsersPosts/FollowingUsersPosts';

const Following = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Header setUser={setUser} />
      <div className="recommend">
        <div className="item">
          <NavLink to="/">Recommend for you</NavLink>
        </div>
        <div className="item">
          <NavLink to="/following">Following</NavLink>
        </div>
      </div>
      <FollowingUsersPosts user={user} />
      <Footer />
    </div>
  );
};

export default Following;
