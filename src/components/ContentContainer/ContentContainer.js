import "./ContentContainer.css";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import RecommendForYou from "./RecommendForYou/RecommendForYou";
import Following from "./Following/Following";

const ContentContainer = () => {
    return (

        <div className="contentContainer">
            <Router>
                <div className="contentContainer__follow">
                    <Link to="/" className="follow__item follow__recommend follow__recommend-active">Recommend for
                        you</Link>
                    <Link to="/following" className="follow__item ">Following</Link>
                </div>
                <div className="contentContainer__content">
                    <Routes>
                        <Route path="/" element={<RecommendForYou/>} />
                        <Route path="/following" element={<Following/>} />
                    </Routes>
                </div>
            </Router>
        </div>

    );
};

export default ContentContainer;
