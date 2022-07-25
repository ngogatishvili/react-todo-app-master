import React, { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CustomAlert from '../../components/Alert';
import {
  loginUser,
  userSelector,
} from '../../redux';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // useSelector hook

  const loginData = useSelector((state) => ({
    user: userSelector(state),
    
  }));

  const { user} = loginData;

  // useDispatch Hook

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    );
  };

  return (
    <>
      {user && <Navigate to="/" />}
      <div className="loginFormContainer">
        <div className="login-form">
           <CustomAlert />
          <h2>Login Form</h2>

          <div className="form-item">
            <TextField
              label="E-mail"
              color="secondary"
              type="email"
              placeholder="type your email..."
              inputRef={emailRef}
              variant="outlined"
            />
          </div>
          <div className="form-item">
            <TextField
              label="password"
              color="secondary"
              type="password"
              placeholder="type your password..."
              inputRef={passwordRef}
              variant="outlined"
            />
          </div>

          <div className="form-item">
            <Button
              onClick={handleLogin}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Sign in
            </Button>
          </div>

          <div>
            Not a member?
            <Link to="/register">
              <Button color="secondary" variant="outlined">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
