import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import TasksList from './components/TaskList';
import useToken from './components/useToken';
import Button from './components/Button';
import Navbar from './components/NavBar';


function App() {

  const [loading, setloading] = useState(true);
  const { token, setToken } = useToken();

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, [])

  return (
    <>
      {
        loading ?
          <div className="spinnerContainer">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> :
          <div className="container">
            <BrowserRouter>
              {token ? <Navbar /> : <></>}
              <Routes>
                <Route exact path="/" element={<Login setToken={setToken} />} />
                <Route exact path="/tasklist" element={<TasksList token={token} />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Routes>
            </BrowserRouter>
          </div>
      }
    </>
  );
}
export default App;