import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FollowingUsersPosts from '../components/FollowingUsersPosts/FollowingUsersPosts';

const Following = () => (
  <div>
    <Header />
    <div className="recommend">
      <Link className="item" to="/">
        Recommend for you
      </Link>
      <Link className="item" to="/following">
        Following
      </Link>
    </div>
    <FollowingUsersPosts />
    <Footer />
  </div>
);

export default Following;
