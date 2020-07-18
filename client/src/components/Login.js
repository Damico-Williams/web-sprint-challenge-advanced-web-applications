import React, { useState, useEffect } from "react";
import {axiosWithAuth} from './axiosWithAuth';

const initialForm = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState(initialForm)
  const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    useEffect(() => {
      if(localStorage.getItem('token')) {
        setLoggedIn(true) 
      } else {
        setLoggedIn(false)
      }
    }, [])


    const handleSubmit = e => {
        e.preventDefault()
    
        axiosWithAuth()
          .post('/api/login', credentials)
          .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.payload);
            setLoggedIn(true)
          })
          .catch(err => {
            console.log(err);
          });
      };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
              <input
              type='text'
              name='username'
              value={credentials.username}
              onChange={handleChange}
              />
              <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              />
              <button>Log in</button>
          </form>
    </>
  );
};

export default Login;
