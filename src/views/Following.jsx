import { NavLink } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FollowingUsersPosts from '../components/FollowingUsersPosts/FollowingUsersPosts';

const Following = () => (
  <div>
    <Header />
    <div className="recommend">
      <div className="item">
        <NavLink to="/">Recommend for you</NavLink>
      </div>
      <div className="item">
        <NavLink to="/following">Following</NavLink>
      </div>
    </div>
    <FollowingUsersPosts />
    <Footer />
  </div>
);

export default Following;
