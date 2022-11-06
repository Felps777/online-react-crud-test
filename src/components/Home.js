import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Button from "./Button";

function Home({ isAuth, isUpdate }) {
    const [postsList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const navigate = useNavigate();

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    const goEditPost = (post) => {
        navigate("/createpost", { isAuth: isAuth, isUpdate: isUpdate, postObj: post });
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, []);

    return (
        <div className="homePage">
            {
                postsList ?
                    (postsList.map((post) => {
                        return (
                            <div className="post">
                                <div className="postHeader">
                                    <div className="title">
                                        <h1> {post.title}</h1>
                                    </div>
                                    <div className="updatePost">
                                        {isAuth && post.author.id === auth.currentUser.uid && (
                                            <Button onClick={() => goEditPost(post)} color="skyblue" text=" &#9999;" />
                                        )}
                                    </div>
                                    <div className="deletePost">
                                        {isAuth && post.author.id === auth.currentUser.uid && (
                                            <Button onClick={() => deletePost(post.id)} color="pink" text=" &#128465;" />
                                        )}
                                    </div>
                                </div>
                                <div className="postTextContainer"> {post.postText}</div>
                                <h3> @{post.author.name}</h3>
                            </div>
                        );
                    })
                    ) : (<>Empty List</>)
            }
        </div>
    );
}
export default Home;