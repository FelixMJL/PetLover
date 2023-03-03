import "./RecommendForYou.css";
import {useState,useEffect} from "react";
import Post from "./post/post";
import {getAllPosts} from "../../services/getAllPosts";

const RecommendForYou = () => {
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        const getPostData = async () => {
            try {
                const post = await getAllPosts();
                setPosts(post.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getPostData();
    },[])

    if(!posts){
        return
    }
    return (
        posts &&posts.map((post)=>(
            <div key={post._id}>
                <Post
                    {...post}
                />
            </div>
        ))
    );
};

export default RecommendForYou;
