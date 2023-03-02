import "./post.css"
import { FaRegComment } from "react-icons/fa";
import React from 'react';

const Post = ({id,avatar,nickname,username,content,image,comments}) => (
    <div className="post-items">
        {/*{`"${avatar}"`}*/}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1LpncdRoijyfGb2atIQQWmlN_5R7tPxNTQ&usqp=CAU"
        className="post-items_avatar"></img>
        <div className="post-items-r">
            <div className="post-items_names">
                <span className="names_nickname">{nickname}</span>
                <span className="names_username">@{username}</span>
            </div>
            <div className="post-items_content-img">
                <p className="content-img_content">{content}</p>
                {/*{`"${image}"`}*/}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVehxeyqnjjv_1lfERFRSywnW1unJy2BDZ6g&usqp=CAU"
                className="content-img_img"></img>
                <a href="#" className="comments">
                    <FaRegComment  className="comments-icon"/>
                    <span className="comments-number">{comments.length}</span>
                </a>
            </div>
        </div>
    </div>
);

export default Post;