import {Link, Route, Routes} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import RecommendForYou from "../components/ContentContainer/RecommendForYou/RecommendForYou";
import Following from "../components/ContentContainer/Following/Following";
import "./HomePage.css"

const HomePage = () => {
    return (
        <div>
            <Header/>
            <div className="recommend">
                <Link className="item" to="/homepage">Recommend for you</Link>
                <Link className="item" to="/homepage/following">Following</Link>
            </div>
            <Routes>
                <Route path="" element={<RecommendForYou/>}/>
                <Route path="following" element={<Following/>}/>
            </Routes>
            <Footer/>
</div>
)
    ;
};

export default HomePage;
