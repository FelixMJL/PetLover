import axios from "axios";

export const getFollowing = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjU0ZTJmMzAyNzBmYWYxNDE5MDQyZSIsImVtYWlsIjoiZmFuZ3dlaWRvbmcxOTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3Nzg0MTUyMywiZXhwIjoxNjc3OTI3OTIzfQ.vhIczz4W-SNfxbMop1QoWX1Xml6XasnpQAg4koQrTAs"
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }
  return await axios.get("http://localhost:8080/api/v1/posts/users/63e8ad946c62483b63fc4c59", config)
}