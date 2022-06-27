import React from 'react';
import {EditedTodo} from './EditedTodo';
import {Checkbox, Grid, IconButton} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import { useAppContext } from '../context/appContext';


export const SingleToDoItem = ({
  item,

}) => {

  const {deleteTodoItem,editTodoItem}=useAppContext();
  
  if (item.edit) {
    return (
      <EditedTodo
        item={item}/>
    );
  }




  const deleteTodoItemById=(todoId)=>{
      deleteTodoItem(todoId);
  }

  const switchToEditMode=(todoId,changeInput)=>{
    editTodoItem(todoId,changeInput);
  }

  const toggleCompletionForTodoItem=(todoId,changeInput)=>{
    editTodoItem(todoId,changeInput)
  }
 

  return (
    <div className='size-const'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={1}>
          <Checkbox
            onClick={()=>toggleCompletionForTodoItem(item._id,{completed:!item.completed})}
            checked={item.completed ? true : false}
            color='secondary'
            
            type='checkbox'
          />
        </Grid>
        <Grid
          item
          xs={3}
          className={`${
            item.completed ? 'line-through overflow' : 'overflow'
          }`}>
          <span>{item.name}</span>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={()=>switchToEditMode(item._id,{edit:true})} >
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton color='error' onClick={()=>deleteTodoItemById(item._id)} >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
