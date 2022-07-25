import React, {useRef} from 'react';
import {Button, TextField} from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import CustomAlert from '../../components/Alert';
import {registerUser, userSelector} from '../../redux';

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPassRef = useRef();

  // useSelector hook
  const registerData = useSelector((state) => ({
    user: userSelector(state),
  }));

  const {user} = registerData;
  // useDispatch  hook

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        repeatPassword: repeatPassRef.current.value,
      })
    );
  };

  return (
    <>
      {user && <Navigate replace to='/' />}
      <div className='registerFormContainer'>
        <div className='register-form'>
          <CustomAlert />
          <h2>Register Form</h2>
          <div className='form-item'>
            <TextField
              label='name'
              color='secondary'
              type='text'
              placeholder='type your name...'
              inputRef={nameRef}
              variant='outlined'
            />
          </div>
          <div className='form-item'>
            <TextField
              label='E-mail'
              color='secondary'
              type='email'
              placeholder='type your email...'
              inputRef={emailRef}
              variant='outlined'
            />
          </div>
          <div className='form-item'>
            <TextField
              label='password'
              color='secondary'
              type='password'
              placeholder='type your password...'
              inputRef={passwordRef}
              variant='outlined'
            />
          </div>
          <div className='form-item'>
            <TextField
              label='repeat password'
              color='secondary'
              type='password'
              placeholder='type your password...'
              inputRef={repeatPassRef}
              variant='outlined'
            />
          </div>

          <div className='form-item'>
            <Button
              onClick={handleRegister}
              type='submit'
              color='secondary'
              variant='contained'>
              Sign Up
            </Button>
          </div>

          <div>
            Already a member?
            <Link to='/login'>
              <Button color='secondary' variant='outlined'>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
