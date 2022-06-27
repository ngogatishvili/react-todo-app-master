import React,{useRef} from 'react'
import { Button } from '@mui/material';
import {Link,Navigate} from 'react-router-dom';
import { useAppContext } from '../context/appContext';

function Login() {
  const {user,loginUser}=useAppContext();
  const emailRef=useRef();
  const passwordRef=useRef();
  const handleLogin=(e)=>{

    e.preventDefault();
    loginUser({email:emailRef.current.value,password:passwordRef.current.value})

  }
  return (
    <>
    {user && <Navigate to="/"/>}
    <div className='loginFormContainer'>
      
      <form onSubmit={handleLogin} className='login-form'>
  
        <h2>Login Form</h2>
        
        <div className='form-item'>
          <input
            color='secondary'
            type='email'
            placeholder='type your email...'
            ref={emailRef}
            
          />
        </div>
        <div className='form-item'>
          <input
            color='secondary'
            type='password'
            placeholder='type your password...'
            ref={passwordRef}
          
          />
        </div>
       
        <div className='form-item'>
          <Button
           type="submit"
            color='secondary'
            variant='contained'>
            Sign in
          </Button>
        </div>

        <div>
          Not a member?
          <Link to="/register">
          <Button   color='secondary' variant='outlined'>Sign Up
          </Button>
          </Link>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login;