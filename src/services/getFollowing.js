import axios from "axios";

export const getFollowing = () => {
  const userTokenData = JSON.parse(localStorage.getItem("userData"));
  const config = {
    headers: {Authorization: `Bearer ${userTokenData.token}`}
};
  return axios.get(`http://localhost:8080/api/v1/posts/users/${userTokenData.id}`, config)
}