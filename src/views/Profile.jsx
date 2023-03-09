import './Profile.css'
import UserInfo from "../components/UserProfile/UserInfo";
import UserPosts from "../components/UserProfile/UserPosts";
import { useState, useEffect } from "react";
import { getUserData } from '../services/getUserData';
import { useParams } from 'react-router-dom';
import axios from "axios";


const Profile = () => {
    
    const {id} = useParams()
    const currentUserId = JSON.parse(localStorage.getItem("userData")).id;
    console.log('id: ', id, 'currentUserId: ', currentUserId)
    const [userData, setUserData] = useState(0)
    const getUser = () => {
        return axios.get(`http://localhost:8080/api/v1/users/${id}`, getUserData().config)
      };
    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUser();
                setUserData(user.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getUserData();
    }, [])

    const {posts} = userData

    return (
        <div>  
            <UserInfo {...userData}/>
            <UserPosts posts = {posts} id = {id} currentUserId = {currentUserId} {...userData} />
        </div>
    );
};

export default Profile;
