import './ConnectUser.css';
import axios from 'axios';

const ConnectUser = (props) => {
  const FollowUser = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmVjMGM4NDYxZTEwYzBkOTRiMjVmMCIsImVtYWlsIjoidGhpbmthYm91dEBnbWFpbC5jb20iLCJpYXQiOjE2Nzc4Mjk2MTUsImV4cCI6MTY3NzkxNjAxNX0.db8MB5gFbutP7KuAkmL6xGpKjx5t4vbDw70kAtCL--s';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.post(
      'http://localhost:4000/api/v1/users/63fec0c8461e10c0d94b25f0/following/63e8768a21bfd46ae27cbda3',
      config
    );
  };

  const btnClickHandler = (e) => {
    //console.log(e.target.dataset);
  };

  return (
    <>
      {props.users.length ? (
        <>
          {props.users.map((user) => (
            <div className="connect-user" key={user.username}>
              <div className="connect-user__avatar">
                <img src={''} alt={user.username + '_avatar'} />
              </div>
              <div className="connect-user__description">
                <div className="connect-user__description--top">
                  <div className="connect-user__description--name">
                    <div className="connect-user__nickname">
                      {user.nickname}
                    </div>
                    <div className="connect-user__username">
                      @{user.username}
                    </div>
                  </div>
                  <button
                    className="btn btn-follow"
                    data-value={user._id}
                    onClick={btnClickHandler}
                  >
                    Follow
                  </button>
                </div>
                <div className="connect-user__introduction">
                  {user.introduction}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ConnectUser;
