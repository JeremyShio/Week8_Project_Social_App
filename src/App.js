import React from 'react';
// Import Home function from home page
import Home from './pages/home';
// Import Navbar
import Navbar from './components/Navbar';
// Import AlertMessage (User flash message)
import AlertMessage from './components/AlertMessage';
// Import Routes, Route, Link functions 
import { Routes, Route } from 'react-router-dom';
// Import useState
import { useState } from 'react';
// Import Register component
import Register from './components/Register';
// Import Login component
import Login from './components/Login';
// Import Create Post component
// import CreatePost from './components/CreatePost';
// Import Posts component
// import Posts from './components/Posts';
// Import Single Post component
// import SinglePost from './components/SinglePost';






function App(props) {

    const now = new Date();
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration')) > now)
    ? true
    : false)

    // User flash message
    const flashMessage = (message, category) => {
        // set callback function for message
        setMessage(message);
        // set callback function for category
        setCategory(category);
    }

    // User login
    const login = () => {
        // set login callback function (true)
        setLoggedIn(true)
    }

    // User logout
    const logout = () => {
        // Logout by revoking user token/expiration
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        // set login callback function (false)
        setLoggedIn(false)
    }

    // Render components onto page
    return (
        <React.Fragment>
            {/* Navbar elements/functions linked to App.js */}
            <Navbar name = '-WE BLOG-' logout = {logout} />
            <div className = 'container'>
                {/* alertMessage component linked to App.js */}
                { message 
                ? <AlertMessage message = {message} category = {category} flashMessage = {flashMessage} />
                : null}
                
                {/* If user passed login check */}
                { loggedIn
                ? <h1>You are currently logged in!</h1>
                : <h1>You are currently logged out, please login to use features!</h1>}

                <Routes>
                    {/* Home */}
                    <Route path = '/' element = {<Home />} />
                    {/* User register */}
                    <Route path = '/register' element = {<Register flashMessage = {flashMessage}/>} />
                    {/* User login */}
                    <Route path = '/login' element = {<Login flashMessage = {flashMessage} login = {login} />} />
                    {/* Create post (flash succes upon post creation) */}
                    {/* <Route path = '/create-post' element = {<CreatePost flashMessage = {this.flashMessage} loggedIn = {this.state.loggedIn} />} /> */}
                    {/* Blog posts */}
                    {/* <Route path = '/blog/posts' element = {<Posts />} /> */}
                    {/* Single Blog post */}
                    {/* <Route path = '/blog/posts/<post_id>' element = {<SinglePost />} /> */}
                </Routes>

            </div>
        </React.Fragment>
    );
}

export default App;