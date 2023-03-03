import axios from "axios";

export const getFollowing = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmM4YjA0MGZkN2Q4NWU0M2E3ZTBmMyIsImVtYWlsIjoid2FuZ0BnbWFpbC5jb20iLCJpYXQiOjE2Nzc4MjkzMTAsImV4cCI6MTY3NzkxNTcxMH0.6tEz1I5Uxsi4Gz50Dz5ssCDUd0Q418kSUzy0UIrCn64"
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }
  return await axios.get("http://localhost:3000/api/v1/posts/users/63fc8b040fd7d85e43a7e0f3", config)
}