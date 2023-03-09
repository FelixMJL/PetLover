import './UserPosts.css'
import MyPost from './post/myPost'
import moment from 'moment'
import bin from '../../assets/bin.png'

const UserPosts = ({posts, username, nickname, avatar, created_at, id, currentUserId}) => {
  return(
    <div className='userPosts'>
      {posts && posts.map((post)=>(
            <div key={post._id} className='postItem'>
              <div className='postItemContainer'>
                <div className='postAvatar'>
                  <img src={avatar} alt = 'avatar' />
                </div>
                <div className='postContentContainer'>
                  <div className='postContent'>
                    <div className='postInfo'>
                      <span className='userName'>{username}</span>
                      <span>@{nickname}</span>
                      <span className='separatingDot'>.</span>
                      <span className="timeFromNow">
                        {moment({created_at}).fromNow()}
                      </span>
                    </div>
                    <div>
                      <span className='bin'>
                       {id === currentUserId ? <img src={bin} alt='' /> : ''}
                      </span>
                    </div>
                  </div>
                  <MyPost
                      {...post}
                  />
                </div>
              </div>
              
              
            </div>
            
        ))}
    </div>
  )
}

export default UserPosts