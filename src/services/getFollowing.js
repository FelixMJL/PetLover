import axios from "axios";
import {getUserData} from "./getUserData";

export const getFollowing = () => {
    return axios.get(`http://localhost:8080/api/v1/posts/users/${getUserData().id}`, getUserData().config)
}