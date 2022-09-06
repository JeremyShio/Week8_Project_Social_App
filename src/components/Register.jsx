// rfc emmet abbr (react functional component)
import React from 'react';
// userNavigate allows us to change pages
import { useNavigate } from 'react-router-dom';




export default function Register(props) {
    // navigate set to useNavigate function (to change pages)
    let navigate = useNavigate();
    
    
    // Preventing submit event from making get request
    const handleSubmit = event => {
        event.preventDefault();
        // Check that the passwords match
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        // If password and confirmPass do not match
        if (password !== confirmPass){
            // Flash user with warning message
            props.flashMessage('Your passwords do not match', 'danger');
        // If password and confirmPass do match
        } else {
            console.log('Passwords do match!');
            // Set up request to Flask App
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            // JSON.stringify user data from form
            let formData = JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password: password
            });
            // Fetch users from class api
            fetch('https://kekambas-blog.herokuapp.com/auth/users', {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                // Recieve a response back...
                .then(res => res.json())
                // With the user data from the form
                .then(data => {
                    // If there is an error, it will be logged 
                    if (data.error){
                        console.error(data.error);
                    // Upon a successful post
                    } else {
                        // Flash message with username and return user home
                        props.flashMessage(`You have successfully registered to the blog ${data.username}, welcome!`, 'success')
                        navigate('/');
                    }
                });
        };
    };


    return (
        <React.Fragment>
            {/* User register form */}
            <h4 className="text-center">Register</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* User input for email */}
                    <label htmlFor="email">Email</label>
                    <input type='text' className='form-control' placeholder='Enter Email' name='email' />
                    {/* User input for username */}
                    <label htmlFor="username">Username</label>
                    <input type='text' className='form-control' placeholder='Enter Username' name='username' />
                    {/* User input for password */}
                    <label htmlFor="password">Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' />
                    {/* User input for confirm password */}
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password Again' name='confirmPass' />
                    {/* User submit button for form */}
                    <input type='submit' className='btn btn-primary w-75 mt-3' value='Register' />
                </div>
            </form>
        </React.Fragment>
    );


};