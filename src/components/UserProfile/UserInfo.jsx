import './UserInfo.css'
import {useNavigate} from "react-router-dom";
import leftArrow from '../../assets/left-arrow.png'

const UserInfo = ({username, posts, nickname, avatar, followers, following}) => {
  
  const navigate = useNavigate();
    const btnClickHandler = () => {
        navigate(-1)
    }

  return(
    <div className='userInfo'>
      {username && (
        <div>
          <div className='headPart'>
            <img src={leftArrow} alt = '' onClick={btnClickHandler} className = 'backToHome' width='20px'/>
            <div className='userTitle'>
              <p className='name'>{username}</p>
              <p className='postsAmount'>{posts.length} Posts</p>
            </div>
          </div>
          <div className='avatarAndEdit'>
            <img src={avatar} alt='avatar'/>
            <button className='btn'>Edit Profile</button>
          </div>
          <div className='userDetail'>
            <p className='userName'>{username}</p>
            <p className='nickName'>@{nickname}</p>
            <div className='followInfo'>
              <p>{following.length} <span>Followings</span></p>
              <p>{followers.length} <span>Followers</span></p>
            </div>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default UserInfo