import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import RecommendForYou from '../components/RecommendForYou/RecommendForYou';
import './HomePage.css';

const HomePage = () => (
  <div className="showAllPosts">
    <Header />
    <div className="recommend">
      <div className="item">
        <NavLink to="/">Recommend for you</NavLink>
      </div>
      <div className="item">
        <NavLink to="/following">Following</NavLink>
      </div>
    </div>
    <RecommendForYou />
    <Footer />
  </div>
);

export default HomePage;
