import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import Button from "./components/Button";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Login from "./components/Login";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.path = "/login";
    });
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/createpost">Create-Post</Link>
            <Button onClick={signUserOut} color='darkgray' text='Sign Out' />
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} isUpdate="false" />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>

  );
}

export default App;
