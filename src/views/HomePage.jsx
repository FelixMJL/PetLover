import {Link} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import RecommendForYou from "../components/RecommendForYou/RecommendForYou";
import "./HomePage.css"

const HomePage = () => {
    return (
        <div className="showAllPosts">
            <Header/>
            <div className="recommend">
                <Link className="item" to="/">Recommend for you</Link>
                <Link className="item" to="/following">Following</Link>
            </div>
            <RecommendForYou />
            <Footer/>
        </div>
    )
};

export default HomePage;
