import './ConnectUser.css';
import loading from "../../assets/loading.svg";

const ConnectUser = (props) => {
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
                <img className="connect-user__avatar--img" src={user.avatar} alt="avatar" />
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
          <div className="loading">
            <img src={loading} alt="loading"/>
          </div>
      )}
    </>
  );
};

export default ConnectUser;
