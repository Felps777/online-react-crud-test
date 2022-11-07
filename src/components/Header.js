import React from 'react';
import Button from './Button';
import '../styles/App.scss';

const Header = ({ showForm, changeTextAndColor }) => {
    return (
        <header className="header">
            <h2 className="app-header">Task Manager App</h2>
            <Button onClick={showForm} color={changeTextAndColor ? 'red' : 'green'} text={changeTextAndColor ? 'Close' : 'Add Task'} />
        </header>
    )
}
export default Header;