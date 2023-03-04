import axios from "axios";
import {getUserData} from "./getUserData";

export const getAllPosts = () => {
    return axios.get("http://localhost:8080/api/v1/posts", getUserData().config)
}