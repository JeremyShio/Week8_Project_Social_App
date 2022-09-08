import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/posts.css';




export default function Posts(props) {
    // navigate set to useNavigate function (to change pages)
    let navigate = useNavigate();

    useEffect(() => {
        if (!props.loggedIn) {
            props.flashMessage('You must be logged in to be able to view posts!', 'danger')
            navigate('/login')
        }
    }, [props.loggedIn]) 
    

    // Preventing submit event from making get request
    const handleSubmit = (event) => {
        event.preventDefault();
        // myHeaders set to Headers fetch function
        let myHeaders = new Headers();
        // Get token from local storage
        let myToken = localStorage.getItem('token');
        // Proper authorization (according to Postman headers)
        myHeaders.append('Authorization', `Bearer ${myToken}`)
        // Proper content type (according to Postman headers)
        myHeaders.append('Content-Type', 'application/json')
        // Retrieve data from event form
        let title = event.target.title.value;
        let subject = event.target.subject.value;
        // JSON.stringify the data object
        let data = JSON.stringify({title, subject})
        // Make a post request with the headers and data
        fetch('https://kekambas-blog.herokuapp.com/blog/posts', {
            method: 'POST',
            headers: myHeaders,
            body: data
        // Recieve a response back...
        }).then(res => res.json())
            .then(data => {
                // If there is an error, it will be logged 
                if (data.error){
                    console.error(data.error)
                // Upon a successful post
                } else {
                    // Flash message and return user home
                    props.flashMessage(`Here are all the posts from the blog!`, 'success')
                    navigate('/')
                }
            })
            
    }
    return (
        <>
            <div class="card bg-dark text-white">
                <img src="../../public/images/socialMediaBlue.png" class="card-img" width="800" height="400" alt="Social Media Blue Card Background Image"></img>
                <div class="card-img-overlay">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text">Last updated 3 mins ago</p>
                </div>
            </div>
        </>
    )
}
