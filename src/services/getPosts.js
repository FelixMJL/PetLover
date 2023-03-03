import axios from "axios";

export const getPosts = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmM4YjA0MGZkN2Q4NWU0M2E3ZTBmMyIsImVtYWlsIjoid2FuZ0BnbWFpbC5jb20iLCJpYXQiOjE2Nzc3NDI3NzEsImV4cCI6MTY3NzgyOTE3MX0.VwLCDFMiQLgmXerMJvAUtIVL1-OcgiA1lHl9U3v0A4s"
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }
  return await axios.get("http://localhost:3000/api/v1/posts", config)
}