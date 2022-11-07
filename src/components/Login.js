import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/Login.css';
import Button from './Button';

function generateToken(credentials) {
    console.debug("Generating token...");
    return ({ "token": "tk" + credentials.username + "#" + credentials.password });
}

export default function Login({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!username && !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please input your Username and Password or close the form!'
            })
        } else if (!username && password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please input your Username!'
            })
        } else if (username && !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please input your Password!'
            })
        } else {
            const token = generateToken({
                username,
                password
            });
            setToken(token);
            navigate("/tasklist", { token: token });
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <Button type="submit" color="" text="Submit" />
                </div>
            </form>
        </div>
    )
}