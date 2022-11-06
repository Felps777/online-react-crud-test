import React, { useEffect, useState } from "react";
import Button from "./Button";
import PostManagement from "./PostsManagement";
import { Post } from "./Post"
//import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {

    const postObj = Post();

    //const postCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        } else {
            postObj.author({ name: auth.currentUser.displayName, id: auth.currentUser.uid });
        }
    });

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create a Post</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input placeholder="Title..." onChange={(e) => { postObj.title(e.target.value) }} />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea placeholder="Post..." onChange={(e) => { postObj.postText(e.target.value) }} />
                </div>
                <Button onClick={PostManagement("C", postObj)} color='gray' text='Submit Post' />
            </div>
        </div>
    )
}
export default CreatePost;