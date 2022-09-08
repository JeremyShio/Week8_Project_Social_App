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
import CreatePost from './components/CreatePost';
// Import Posts component
import Posts from './components/Posts';
// Import Single Post component
// import SinglePost from './components/SinglePost';
// logged-in picture
// import socialMediaBlue from './static/images/social_media_blue.png'
// logged-out picture
// import socialMediaLight from './static/images/social_media_light.jpg'





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
            <Navbar name = '-WE BLOG-' logout = {logout} loggedIn = {loggedIn}/>
            <div className = 'container'>
                {/* alertMessage component linked to App.js */}
                { message 
                ? <AlertMessage message = {message} category = {category} flashMessage = {flashMessage} />
                : null}
                
                {/* Login check */}
                { loggedIn
                // If user is logged-in
                ? <h1>Please Blog Responsibly, Cheers!</h1>
                // If user is logged-out
                : <h1>In Order to Blog You Need to Log... In... Haha</h1>}

                <Routes>
                    {/* function does NOT use class components (.this) before state/props, uses variable names instead! */}

                    {/* Home */}
                    <Route path = '/' element = {<Home />} />
                    {/* User register */}
                    <Route path = '/register' element = {<Register flashMessage = {flashMessage}/>} />
                    {/* User login */}
                    <Route path = '/login' element = {<Login flashMessage = {flashMessage} login = {login} />} />
                    {/* Create post (flash succes upon post creation) */}
                    <Route path = '/create-post' element = {<CreatePost flashMessage = {flashMessage} loggedIn = {loggedIn} />} />
                    
                    
                    {/* Blog posts */}
                    <Route path = '/blog/posts' element = {<Posts />} loggedIn = {loggedIn} />
                    {/* Single Blog post */}
                    {/* <Route path = '/blog/posts/<post_id>' element = {<SinglePost />} loggedIn = {loggedIn} />  */}
                </Routes>

            </div>
        </React.Fragment>
    );
};

export default App;