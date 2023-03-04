import axios from "axios";
import {getUserData} from "./getUserData";

export const getUserByID = () => {
    return axios.get(`http://localhost:8080/api/v1/users/${getUserData().id}`, getUserData().config);
}