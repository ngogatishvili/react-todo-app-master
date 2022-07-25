import React, {useState} from 'react';
import {Checkbox, Grid, IconButton, TextField, Button} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import CustomAlert from '../Alert';
import {
  currentPageSelector,
  deleteTodoItem,
  editTodoItem,
  recordPerPageSelector,
} from '../../redux';
import '../../axios';

function SingleToDoItem({item}) {
  const [inputValue, setInputValue] = useState(item.name);
  const [isInEditMode, setIsInEditMode] = useState(item.edit);
  // use selector hook

  const todoItemData = useSelector((store) => ({
    currentPage: currentPageSelector(store),
    recordPerPage: recordPerPageSelector(store),
  }));

  const {currentPage, recordPerPage} = todoItemData;

  // use dispatch hook
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(deleteTodoItem(item._id, currentPage, recordPerPage));
  };

  const editItem = () => {
    setIsInEditMode(true);
    dispatch(editTodoItem(item._id, {edit: true}));
  };

  const toggleCompletionForTodoItem = () => {
    dispatch(editTodoItem(item._id, {completed: !item.completed}));
  };

  const saveTodoItem = () => {
    dispatch(editTodoItem(item._id, {edit: false, name: inputValue}));
    if (inputValue) setIsInEditMode(false);
  };

  const cancelUpdateForTodoItem = () => {
    dispatch(editTodoItem(item._id, {edit: false, name: item.name}));
    setIsInEditMode(false);
  };

  if (isInEditMode) {
    return (
      <div className='todo-item'>
        <TextField
          color='secondary'
          size='small'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button color='success' variant='contained' onClick={saveTodoItem}>
          save
        </Button>

        <Button
          color='error'
          variant='outlined'
          onClick={cancelUpdateForTodoItem}>
          cancel
        </Button>
        <CustomAlert />
      </div>
    );
  }

  return (
    <div className='size-const'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={1}>
          <Checkbox
            checked={!!item.completed}
            color='secondary'
            type='checkbox'
            onClick={toggleCompletionForTodoItem}
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
          <IconButton onClick={editItem}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={deleteItem} color='error'>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleToDoItem;
