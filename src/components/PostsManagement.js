import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function PostManagement(crudActionLetter, postObj) {

    const postCollectionRef = collection(db, "posts");

    if (crudActionLetter === "C") {
        const createpost = async ({ postObj }) => {
            postObj.setAuthor();
            //author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
            await addDoc(postCollectionRef, postObj);
        };
    } else if (crudActionLetter === "R") {
        // Can read one or all
        if (postObj) {
            const getPost = async (id) => {
                const postDoc = doc(db, "posts", id);
                await getDoc(postDoc);
            }
        } else {
            //List all
            const getPosts = async () => {
                const data = await getDocs(postCollectionRef);
                console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

                return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            };
            getPosts().catch(err => { "Empty List 2" });
        }

    } else if (crudActionLetter === "U") {
        const deletePost = async (id) => {
            const postDoc = doc(db, "posts", id);
            await updateDoc(postDoc);
        }
    } else if (crudActionLetter === "D") {
        const deletePost = async (id) => {
            const postDoc = doc(db, "posts", id);
            await deleteDoc(postDoc);
        }
    }

}
export default PostManagement;
