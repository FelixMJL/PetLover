import {Link} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import RecommendForYou from "../components/RecommendForYou/RecommendForYou";
import "./HomePage.css"

const HomePage = () => {
    return (
        <div>
            <Header/>
            <div className="recommend">
                <Link className="item" to="/homepage">Recommend for you</Link>
                <Link className="item" to="/homepage/following">Following</Link>
            </div>
            <RecommendForYou />
            <Footer/>
        </div>
    )
};

export default HomePage;
