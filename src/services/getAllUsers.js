import axios from "axios";
import {getUserData} from "./getUserData";

export const getAllUsers = () => {
  return axios.get("http://localhost:8080/api/v1/users",getUserData().config)
}