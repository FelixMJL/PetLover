import './ConnectUser.css';

const ConnectUser = (props) => {
  const btnClickHandler = () => {};

  return (
    <>
      {props.users.length ? (
        <>
          {props.users.map((user) => (
            <div className="connect-user" key={user.username}>
              <div className="connect-user__avatar">
                <img
                  src={'/src/assets/test-img.jpg'}
                  alt={user.username + '_avatar'}
                />
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
                  <button className="btn btn-follow" onClick={btnClickHandler}>
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
