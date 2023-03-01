import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsers } from '../services/getUsers';

// const Connect = () => {
//     return (
//         <div>
//             <h1>Connect</h1>
//         </div>
//     );
// };

// export default Connect;



const Connect = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      {users.length ? (
        <>
          {users.map((user) => (
            <div className="user-preview" key={user.username}>
                <h3>{user.nickname}</h3>
                <div>@{user.username}</div>
                <div>{user.introduction}</div>
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Connect;