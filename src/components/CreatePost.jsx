// rfc emmet abbr (react functional component)
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




// Create post function (props) -- just in case (as good practice)
export default function CreatePost(props) {
    // navigate set to useNavigate function (to change pages)
    let navigate = useNavigate();

    useEffect(() => {
        if (!props.loggedIn) {
            props.flashMessage('You must be logged in to be able to upload new posts!', 'danger')
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
                    props.flashMessage(`Your post ${data.title} is now uploaded!`, 'success')
                    navigate('/')
                }
            })
            
    }
    return (
        // Form element to contain CreatePost elements
        <form onSubmit = {handleSubmit}>
            {/* Form title for user (what is this form for?) */}
            <h3 className = 'text-center'>Create New Post</h3>
            {/* Div element to contain label/input elements */}
            <div className="form-group">
                {/* Title label/input elements */}
                <label htmlFor="title">Post Title</label>
                <input type='text' name='title' className='form-control' placeholder='Enter the Title of your new Post!' />
                {/* Subject label/input elements */}
                <label htmlFor="subject">Post Subject</label>
                <input type='text' name='subject' className='form-control' placeholder='Enter the Subject of your new Post!' />
                {/* Text label/input elements */}
                <label htmlFor="text">Post Text</label>
                <input type='text' name='text' className='form-control' placeholder="Enter the Text contents of your new Post! Tell us, what's your story today?" />
                {/* User submit button for form */}
                <input type='submit' className='btn btn-primary w-75 mt-3' value='Register' />
            </div>
        </form>
    )
}
