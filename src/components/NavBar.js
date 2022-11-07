import React from 'react';
import '../styles/App.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const navigate = useNavigate();

    const signUserOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <nav className='navbar navbar-default '>
            <Link to="/tasklist" className='btn'>Task List</Link>
            <Link to="/" className='btn'>Change user</Link>
            <Button onClick={signUserOut} color='darkgray' text='Sign Out' />
        </nav>
    );
};

export default Navbar;