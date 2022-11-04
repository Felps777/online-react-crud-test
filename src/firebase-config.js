// JavaScript
// src/firebase-config.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, AuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPwnRnCF4fSbChutViy9wuVp3sqE3YGvo",
    authDomain: "task-manager-24f2a.firebaseapp.com",
    projectId: "task-manager-24f2a",
    storageBucket: "task-manager-24f2a.appspot.com",
    messagingSenderId: "879768307253",
    appId: "1:879768307253:web:809373d5607b66e639937c"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app);
//export const provider = new AuthProvider();
