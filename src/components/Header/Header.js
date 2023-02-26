import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { getUser } from "../../services/getUser";

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
        getUser().then(user => setUserData(user.data))
    }, [])
    console.log(userData)

    return (
        <div className="header">
            <div className="header__head">
                <img src="" alt="avatar" className="avatar" onClick={extendMenu}/>
                <img src="" alt="logo" className="logo"/>
            </div>
            <div className="porfileMenu" ref={profileMenu}>
                <div className="porfileMenuHeader">
                    <h4>Account info</h4>
                    <button className="closeProfileMenu" onClick={closeMenu}>X</button> 
                </div>
                
                <div>
                    {userData && (
                        <div>
                            <img src={userData.avator} alt="avatar"></img>
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
                    <h2>Profile</h2>
                </div>
                
            </div>
            <div ref={darkBackground} className='darkBackground'></div>
        </div>

    );
};

export default Header;
