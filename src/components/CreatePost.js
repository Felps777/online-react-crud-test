import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth, isUpdate, postObj }) {
    const [updateFlag, setUpdateFlag] = useState(isUpdate || false);
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "posts");
    const navigate = useNavigate();

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        navigate("/");
    };

    const updatePost = async (id) => {
        const postDoc = doc(db, "users, id");
        const changes = { title: title, postText: postText };
        await updateDoc(postDoc, changes);
        setUpdateFlag(false);
        navigate("/");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);


    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        placeholder={!updateFlag ? "Title..." : postObj.title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea
                        placeholder={!updateFlag ? "Post..." : postObj.textarea}
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button onClick={!updateFlag ? createPost : updatePost(postObj.id)}> Submit Post</button>
            </div>
        </div>
    );
}

export default CreatePost;