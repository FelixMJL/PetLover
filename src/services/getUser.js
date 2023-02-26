import axios from "axios";

export const getUser = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmE1YTc4MmZhNWRlZDJhNDc5MDEyNiIsImVtYWlsIjoiaGVsbG93b3JsZEBnbWFpbC5jb20iLCJpYXQiOjE2NzczNTE5OTksImV4cCI6MTY3NzQzODM5OX0.vZaNVAUW1RzfmcXABKlfQBEoNUNIjpa0NGQ6PXL24zs"
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }
  return await axios.get("http://localhost:3000/api/v1/users/63fa5a782fa5ded2a4790126", config)
}