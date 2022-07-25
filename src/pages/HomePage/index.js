import {Typography, IconButton, Button, TextField, Avatar} from '@mui/material';
import {Add} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {FaCaretDown} from 'react-icons/fa';
import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SingleToDoItem from '../../components/SingleToDoItem';
import CustomALert from '../../components/Alert';
import {
  getTodoItems,
  logout,
  createTodoItem,
  selectTodoItems,
  uploadImage,
} from '../../redux';

let userData = JSON.parse(localStorage.getItem('user'));

function HomePage() {
  const inputRef = useRef(null);

  // useSelector hook

  const todoItemsData = useSelector((store) => ({
    todoItems: selectTodoItems(store),
  }));

  const {todoItems} = todoItemsData;

  // useDispatch hook

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoItems());
    userData = JSON.parse(localStorage.getItem('user'))
  }, [dispatch]);

  
  const [showLogout, setShowLogout] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [image, setImage] = useState(`http://localhost:5000/${userData.image}`);

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(createTodoItem({name: inputRef.current.value}));
    inputRef.current.value = '';
  };

  const addTodoHandlerForKeyBoardSubmit = (e) => {
    if (e.which === 13) {
      dispatch(createTodoItem({name: inputRef.current.value}));
      inputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    setUploadedImage(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  const handleCancelUpload = () => {
    setShowUpload(false);
    setUploadedImage(userData.image);
  };

  const saveUploadedProfile = async () => {
    const imageObj = new FormData();
    imageObj.append('avatar', uploadedImage);
    const uploadedImageFile = await dispatch(
      uploadImage(userData.id, imageObj)
    );
    if (uploadedImageFile) {
      window.location.reload();
      window.onload = () => {
        setImage(`http://localhost:5000/${uploadedImageFile}`);
      };
    }
  };

  return (
    <div className='App'>
      <CustomALert />
      <div className='navbar'>
        <div className='avatar'>
          <div className='column'>
            <Avatar src={image} sx={{width: 100, height: 100}} />
            <Typography variant='body1' color='textSecondary'>
              {userData.name}
            </Typography>
            {!showUpload && (
              <Button
                color='secondary'
                onClick={() => setShowUpload(true)}
                style={{textTransform: 'none'}}
                size='small'
                fontSize='small'>
                Update your profile picture
              </Button>
            )}

            {showUpload && (
              <div>
                <input type='file' multiple={false} onChange={handleChange} />

                <Button onClick={saveUploadedProfile} color='success'>
                  Save changes
                </Button>
                <Button onClick={handleCancelUpload} color='error'>
                  cancel
                </Button>
              </div>
            )}
            {showLogout && (
              <Button
                color='secondary'
                variant='contained'
                onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>

          <FaCaretDown onClick={() => setShowLogout(!showLogout)} />
        </div>

        <div className='column'>
          <Button
            style={{margin: '10px 0'}}
            variant='contained'
            color='secondary'>
            <Link style={{color: '#fff'}} to='/settings'>
              Go to Settings
            </Link>
          </Button>
          <Button variant='contained' color='secondary' onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>

      <header>
        <Typography variant='h2'>To do List </Typography>
      </header>
      <div className='form-control'>
        <CustomALert />
        <TextField
          label='add todo item'
          color='secondary'
          inputRef={inputRef}
          type='text'
          onKeyUp={addTodoHandlerForKeyBoardSubmit}
        />
        <IconButton
          onClick={addTodoHandler}
          color='secondary'
          size='large'
          type='submit'>
          <Add />
        </IconButton>
      </div>
      <div className='itemContainer'>
        {todoItems?.length ? (
          todoItems.map((item) => (
            <SingleToDoItem key={item._id} item={item} todoItems={todoItems} />
          ))
        ) : (
          <h1>No todo items yet</h1>
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
