import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { getUser } from "../../services/getUser";
import {Link} from "react-router-dom";
import {getUserData} from "../../services/getUserData";

const Header = () => {
    const profileMenu = useRef(null)
    const darkBackground = useRef(null)

    const extendMenu = () => {
        profileMenu.current.classList.add('active')
        darkBackground.current.classList.add('show')
    }

    const closeMenu = () => {
        profileMenu.current.classList.remove('active')
        darkBackground.current.classList.remove('show')
    }
    const [userData, setUserData] = useState(0)
    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUser();
                setUserData(user.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getUserData();
    }, [])

    return (
        <div className="header">
            <div className="header__head">
                <img src={userData.avatar} alt="avatar" className="avatarInHeader" onClick={extendMenu}/>
                <img src="" alt="logo" className="logoInHeader"/>
            </div>
            <div className="profileMenu" ref={profileMenu}>
                <div className="profileMenuHeader">
                    <h4>Account info</h4>
                    <button className="closeProfileMenu" onClick={closeMenu}>X</button>
                </div>

                <div>
                    {userData && (
                        <div className="user-menu">
                            <img src={userData.avatar} alt="avatar" className="user-menu__avatar"></img>
                            <p>{userData.username}</p>
                            <p>{userData.nickname}</p>
                            <div className="aboutFollowOfUser">
                                <p>{userData.following.length} Followings</p>
                                <p>{userData.followers.length} Followers</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="UserProfileMenuList">
                    <h2>
                    <Link to={`/profile/${getUserData().id}`}>Profile</Link>
                        
                    </h2>
                </div>

            </div>
            <div ref={darkBackground} className='darkBackground'></div>
        </div>

    );
};

export default Header;
