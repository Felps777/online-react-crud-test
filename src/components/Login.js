import React from "react";
import { auth } from "../firebase-config";
import { signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Login({ setIsAuth }) {

    let navigate = useNavigate();

    const signIn = () => {
        signInAnonymously(auth).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
            console.log("checking login... isAuth=" + localStorage.getItem("isAuth"));
        });
    };

    return (
        <div className="loginPage">
            <p>Please click on the button to sign in.</p>
            <Button onClick={signIn} color="skyblue" text="Sign In" />
        </div>
    );
}
export default Login;