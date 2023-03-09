import "./myPost.css"
import { FaRegComment } from "react-icons/fa";
import React from 'react';

const MyPost = ({content,image,comments}) => (
    <div className="singlePost">
        <div className="container">
            <p className="contentText">{content}</p>
            <img src={image}
            className="contentImg" alt="content-img"></img>
            <div className="comments">
                <FaRegComment  className="commentsIcon"/>
                <span className="commentsAmount">{comments.length}</span>
            </div>
        </div>
        
    </div>
);

export default MyPost;