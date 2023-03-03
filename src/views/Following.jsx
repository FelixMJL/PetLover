import Header from "../components/Header/Header";
import {Link} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import FollowingUsersPosts from "../components/FollowingUsersPosts/FollowingUsersPosts";

const Following = () => {
    return (
        <div>
            <Header/>
            <div className="recommend">
                <Link className="item" to="/homepage">Recommend for you</Link>
                <Link className="item" to="/homepage/following">Following</Link>
            </div>
            <FollowingUsersPosts/>
            <Footer/>
        </div>
    );
};

export default Following;
