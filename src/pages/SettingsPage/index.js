import React, { useState} from 'react';

import {
  Paper,
  Divider,
  Container,
  Typography,
  Button,
  AppBar,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Password,
  Settings,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {changeUsername, updatePassword} from '../../redux';
import CustomAlert from '../../components/Alert';

const userData = JSON.parse(localStorage.getItem('user'));

function SettingsPage() {
 
  const dispatch = useDispatch();

  const userId = userData?.id;
  const [editMode, setEditMode] = useState(false);
  const [passEdit, setPassEdit] = useState(false);
  const [userName, setUsername] = useState(userData?.name);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsData, setPasswordsData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });



  const switchToEditMode = () => {
    setEditMode(true);
  };

  const cancelUsernameUpdate = () => {
    setEditMode(false);
    setUsername(userData?.name);
  };

  const saveUpdatedUsernameChanges = async (id, value) => {
    const updatedUsername = await dispatch(changeUsername(id, value));
    localStorage.setItem("user",JSON.stringify({...userData,name:userName}))
    if (updatedUsername) {
      setUsername(updatedUsername);
      setEditMode(false);
    }
  };

  const changePassword = (e) => {
    setPasswordsData({...passwordsData, [e.target.name]: e.target.value});
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const cancelPasswordChange = () => {
    setPassEdit(false);
    setPasswordsData({
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    });
  };

  const savePasswordChanges = async (id, value) => {
    const data = await dispatch(updatePassword(id, value));
    if (data?.success) {
      setPassEdit(false);
    }
  };

 

  return (
    <Container maxWidth='lg'>
      <CustomAlert />

      <AppBar position='static' color='inherit'>
        <Settings />
        <Typography variant='h2'>Settings</Typography>
      </AppBar>
      <Divider />
      <Paper style={{margin: '20px 0'}} spacing={2}>
        <div className='settingItem'>
          <div className='currentCreds'>
            <Typography variant='h6'>Change username</Typography>

            {editMode && (
              <>
                <TextField
                  variant='outlined'
                  fullWidth
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  onClick={() => saveUpdatedUsernameChanges(userId, userName)}
                  color='success'
                  variant='contained'>
                  Save Changes
                </Button>
                <Button onClick={cancelUsernameUpdate} color='error'>
                  cancel
                </Button>
              </>
            )}
            {!editMode && (
              <Typography variant='h6' color='textSecondary'>
                {userName}
              </Typography>
            )}
          </div>

          <Button
            onClick={switchToEditMode}
            variant='contained'
            color='primary'>
            Change
          </Button>
        </div>
        <Divider />
        <div className='settingItem'>
          <div className='currentCreds'>
            <Typography variant='h6'>Change password</Typography>
            {!passEdit && <Password />}

            {passEdit && (
              <>
                <TextField
                  name='oldPassword'
                  onChange={changePassword}
                  type='password'
                  value={passwordsData.oldPassword}
                  label='Enter your old password'
                />
                <br />
                <TextField
                  name='newPassword'
                  onChange={changePassword}
                  type={showPassword ? 'text' : 'password'}
                  value={passwordsData.newPassword}
                  label='Enter your new password'
                  InputProps={
                    passwordsData.newPassword
                      ? {
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={handleShowPassword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }
                      : null
                  }
                />
                <br />
                <TextField
                  name='repeatPassword'
                  onChange={changePassword}
                  type='password'
                  value={passwordsData.repeatPassword}
                  label='Repeat password'
                />
                <br />
                <br />

                <Button
                  onClick={() => savePasswordChanges(userId, passwordsData)}
                  variant='contained'
                  color='success'>
                  Save Changes
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={cancelPasswordChange}>
                  Cancel
                </Button>
              </>
            )}
          </div>
          <Button
            onClick={() => setPassEdit(true)}
            variant='contained'
            color='primary'>
            Change
          </Button>
        </div>
        <Divider />
        <Button color='primary'>
          <Link to="/">Back to Home</Link>
        </Button>
      </Paper>
    </Container>
  );
}

export default SettingsPage;
