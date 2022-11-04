//import { async } from "@firebase/util";
//import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
//import { db } from "../firebase-config";
import Button from "./Button";
import PostManagement from "./PostsManagement";

function Home({ isAuth }) {
    const [postList, setPostList] = useState([]);
    //const postCollectionRef = collection(db, "posts");
    //let navigate = useNavigate();

    useEffect(() => {
        setPostList(PostManagement("R", null));
    }, []);

    return (
        <div className="homePage">
            {
                postList ?
                    (postList.map((post) => {
                        return (
                            <div className="post">
                                <div className="postHeader">
                                    <div className="title">
                                        <h1> {post.title}</h1>
                                    </div>
                                    <div className="deletePost">
                                        <Button onClick={() => PostManagement("D", post)} color="pink" text=" &#128465;" />
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