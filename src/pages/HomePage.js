
import { Typography,IconButton, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { SingleToDoItem } from '../components/SingleToDoItem';
import Pagination from "../components/Pagination";
import { useAppContext } from '../context/appContext';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import {Navigate} from "react-router-dom"




function HomePage() {
  
  const {createTodoItem}=useAppContext();
    const inputRef=useRef(null);
    const {todoItems,user,logoutUser,getTodoItems}=useAppContext();
    const [showLogout,setShowLogout]=useState(false);

    useEffect(()=>{
      getTodoItems();
    },[])


    const createTodoHandler=e=>{
      e.preventDefault();
      createTodoItem({name:inputRef.current.value});


    }

    if(!localStorage.getItem("user")) {
      return <Navigate to="/register"/>
  }
  

  return (
    <div className='App'>
      <div className="user">
      <Button variant="contained" color="secondary" onClick={()=>setShowLogout(!showLogout)}>
        <FaUserCircle/>
        {user}
        <FaCaretDown/>
      </Button>
     {showLogout && <Button onClick={()=>logoutUser()} variant="outlined" color="secondary">Log out</Button> } 
      </div>
     
    <header>
      <Typography variant='h2'>To do List </Typography>
    </header>
    <form onSubmit={createTodoHandler} className='form-control'>
      <input type='text'
        ref={inputRef}
        />
        <IconButton color='secondary'
        size='large' type="submit">
        <Add />
      </IconButton>
    </form>
    <div className='itemContainer'>
      {todoItems.length?todoItems.map((item) => {
        return (
          <SingleToDoItem
            key={item._id}
            item={item}
            todoItems={todoItems}
          />
        );
      }):<h1>No todo items yet</h1>}
    </div>
    <Pagination/>
    </div>
    )
 
}

export default HomePage;