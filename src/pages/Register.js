import React,{useRef} from 'react';
import { Alert, Button } from '@mui/material';
import {Link,Navigate} from 'react-router-dom';
import { useAppContext } from '../context/appContext';


function Register() {

  const {registerUser,user,showAlert,alertText}=useAppContext();
 
  const nameRef=useRef();
  const emailRef=useRef();
  const passwordRef=useRef();
  const handleRegister=e=>{
    e.preventDefault();
    registerUser({name:nameRef.current.value,email:emailRef.current.value,password:passwordRef.current.value});
    

  }


  return (
    <>

    {user && <Navigate to="/"/> }
  
    <div className='registerFormContainer'>
   
      <form onSubmit={handleRegister} className='register-form'>
    {showAlert && <Alert severity="error">{alertText}</Alert> }
        <h2>Register Form</h2>
        <div className='form-item'>
          <input
            color='secondary'
            type='text'
            placeholder='type your name...'
            ref={nameRef}
          
          />
        </div>
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
            Sign Up
          </Button>
        </div>

        <div>
          Already a member?
          <Link to="/login">
          <Button  color='secondary' variant='outlined'>Sign In
          </Button>
          </Link>
        </div>
      </form>
    </div>
    </>
  )
}

export default Register;