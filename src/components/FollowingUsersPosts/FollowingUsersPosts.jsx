import "../ContentContainer/Following/Following.css"
import {getFollowing} from "../../services/getFollowing";
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
        <div className="post-container">
            <div className="post-inner-container">
                <div className="avatar">
                    <img src={post.author.avatar} alt=""/>
                </div>
                <div className="post-content-container">
                    <div className="post-info">
                        <div className="nickname">
                            <p><b>{post.author.nickname}</b></p>
                        </div>
                        <div className="username">
                            <p>@{post.author.username}</p>
                        </div>
                        <div className="dot"> · </div>
                        <div className="post-time">
                            <p>{moment(post.created_at).fromNow()}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p>{post.content}</p>
                    </div>
                    <div className="post-pic">
                        <img src={post.photo} alt=""/>
                    </div>
                    <div className="comment">
                        <img src="" alt=""></img>
                        <p className="comment-count">{post.comments.length}</p>
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
            <div className="foot-space"></div>
        </div>
    );
};

export default Following;
