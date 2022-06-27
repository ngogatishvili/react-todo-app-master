import axios from 'axios';
import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import { useAppContext } from '../context/appContext';

export const EditedTodo = ({item}) => {

  const {editTodoItem}=useAppContext();

  const [inputValue, setInputValue] = useState(item.name);

  const saveUpdatedTodoItem = (todoId,changeInput) => {
      editTodoItem(todoId,changeInput);
  };

  const cancelUpdatedChangesForTodoItem=(todoId,changeInput)=>{
        editTodoItem(todoId,changeInput);
  }
  // const cancelUpdatedChangesForTodoItem = () => {
  //   axios
  //     .patch(`http://localhost:5000/api/v1/todos/${item._id}`, {edit: false})
  //     .then(() => {
  //       const updatedItems = todoItems.map((todo) => {
  //         if (todo._id === item._id) {
  //           todo.name = item.name;
  //           todo.edit = false;
  //         }
  //         return todo;
  //       });
  //       changeTodoItems(updatedItems);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  return (
    <div>
      <TextField
        color='secondary'
        size='small'
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button color='success' variant='contained' onClick={()=>saveUpdatedTodoItem(item._id,{name:inputValue,edit:false})}>
        save
      </Button>
      <Button
        color='error'
        variant='outlined'
        onClick={()=>cancelUpdatedChangesForTodoItem(item._id,{edit:false,name:item.name})}
        >
        cancel
      </Button>
    </div>
  );
};
