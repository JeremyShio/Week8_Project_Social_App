// rfc emmet abbr (React Functional Component)
import React from 'react';
// Enables us to add global navigation
import { Link } from 'react-router-dom';
// import navbar.css
import '../css/navbar.css';
// Home icon
import CottageIcon from '@mui/icons-material/Cottage';
// Register icon
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// Login icon
import LoginIcon from '@mui/icons-material/Login';
// Create New Post icon
import NoteAddIcon from '@mui/icons-material/NoteAdd';
// Logout icon
import LogoutIcon from '@mui/icons-material/Logout';




// User Navbar
export default function Navbar(props) {
    return (
        <nav className = "navbar navbar-expand-lg navbar-light bg-light">
            <div className = "navbar-container">

                {/* Left portion of Navbar */}
                <div className = 'navbar-left'>
                    <a className = "navbar-brand" href = "/">{props.name}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/"><CottageIcon /> Home </Link>
                            {/* If user is logged-in */}
                            { props.loggedIn ? (
                                <React.Fragment>
                                    <Link className="nav-link" to="/create-post"><NoteAddIcon />Create a New Post</Link>
                                    <Link className="nav-link" to="/" onClick={props.logout}><LogoutIcon />Logout</Link>
                                </React.Fragment>
                            // If user is NOT logged-in
                            ) : (
                                <React.Fragment>
                                    <Link className="nav-link" to="/register"><PersonAddIcon />Register</Link>
                                    <Link className="nav-link" to="/login"><LoginIcon />Login</Link>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right portion of Navbar */}
                <div className = 'navbar-right'>
                    <form className="d-flex">
                        <input className="form-control" type="search" placeholder="Post Title" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};