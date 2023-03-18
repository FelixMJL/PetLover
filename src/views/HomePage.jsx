import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RecommendForYou from '../components/RecommendForYou/RecommendForYou';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  return (
    <div className="showAllPosts">
      <Header setUser={setUser} />
      <div className="recommend">
        <div className="item">
          <NavLink to="/">Recommend for you</NavLink>
        </div>
        <div className="item">
          <NavLink to="/following">Following</NavLink>
        </div>
      </div>
      <RecommendForYou user={user} />
      <Footer />
    </div>
  );
};

export default HomePage;
