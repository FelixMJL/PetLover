import "./RecommendForYou.css";
import axios from "axios";
import {useState,useEffect} from "react";
import Post from "./post/post";

const RecommendForYou = () => {
    const getAllPosts = async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjg4ZTViYTgzYTcyOTQwYWYyNjU2ZCIsImVtYWlsIjoiZXJpY2xpdUFhMTIzNDU2QGdtYWlsLmNvbSIsImlhdCI6MTY3Nzc0MTk2NiwiZXhwIjoxNjc3ODI4MzY2fQ.9ZIu25ELImxwHotWtz6FWIxxp54ixE8jOtG3yL5RtRY"
            const config = {
                    headers: {Authorization: `Bearer ${token}`}
            }
            return await axios.get("http://localhost:8080/api/v1/posts", config)
    }

    const [posts,setPosts]=useState([])

    useEffect(()=>{
        getAllPosts().then((res)=>{
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[])
    if(!posts){
        return
    }
    return (
        posts &&posts.map(({_id, author, content, image,comments})=>(
            <Post
                key={_id}
                id={_id}
                avatar={author.avatar}
                nickname={author.nickname}
                username={author.username}
                content={content}
                image={image}
                comments={comments}
            />
        ))
    );
};

export default RecommendForYou;
