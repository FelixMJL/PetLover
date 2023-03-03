import "./Following.css"
import {getFollowing} from "../../../services/getFollowing";
import { useState, useEffect } from "react";
import moment from 'moment';

const Following = () => {
    const [postData, setUserData] = useState(0)
    useEffect(() => {
        getFollowing().then(user => setUserData(user.data))
    }, [])

    function DataList({ posts }) {
        const list = posts.map((post,i) => 
    <li key={`${i}`}>
        <div class="post-container">
            <div class="post-inner-container">
                <div class="avatar">
                    <img src={post.author.avatar} alt=""/>
                </div>
                <div class="post-content-container">
                    <div class="post-info">
                        <div class="nickname">
                            <p><b>{post.author.nickname}</b></p>
                        </div>
                        <div class="username">
                            <p>@{post.author.username}</p>
                        </div>
                        <div class="dot"> · </div>
                        <div class="post-time">
                            <p>{moment(post.created_at).fromNow()}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>{post.content}</p>
                    </div>
                    <div class="post-pic">
                        <img src={post.photo} alt=""/>
                    </div>
                    <div class="comment">
                        <img src="" alt=""></img>
                        <p class="comment-count">{post.comments.length}</p>
                    </div>
                </div>
            </div>
        </div>
    </li>
    );
        return <ul>{list}</ul>;
      }

    return (
        <div>
            <h1>Following</h1>
            <div>
                <DataList posts={Array.from(postData)} />
            </div>
            <div class="foot-space"></div>
        </div>
    );
};

export default Following;
