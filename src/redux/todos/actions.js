import axios from 'axios';
import {
  SET_LOADING,
  GET_TODO_ITEMS_SUCCESS,
  CREATE_TODO_ITEM_SUCCESS,
  EDIT_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM_SUCCESS,
} from './constants';
import '../../axios';
import { showAlert } from '../alert/actions';
import getError from '../../utils';

// pure action creators

const setLoading = () => ({
  type: SET_LOADING,
});

export const getTodoItemsSuccess = (todoData) => ({
  type: GET_TODO_ITEMS_SUCCESS,
  payload: todoData,
});


export const createTodoSuccess = (newTodoData) => ({
  type: CREATE_TODO_ITEM_SUCCESS,
  payload: newTodoData,
});



export const deleteTodoSuccess = (newTodoData) => ({
  type: DELETE_TODO_ITEM_SUCCESS,
  payload: newTodoData,
});



export const editTodoSuccess = (editTodoData) => ({
  type: EDIT_TODO_ITEM_SUCCESS,
  payload: editTodoData,
});



// async action creators

export const getTodoItems = () => (dispatch) => {
  setLoading();
  axios
    .get('/api/v1/todos?page=1')
    .then((response) => {
      const { todos, todoCount } = response.data;
      dispatch(getTodoItemsSuccess({ todos, total: todoCount, current: 1 }));
    })
    .catch(()=>{
      showAlert("could not fetch data")
    })
};

export const createTodoItem = (todoInput) => (dispatch) => {
  axios
    .post('/api/v1/todos', { ...todoInput })
    .then((response) => {
      const { todoItems, totalRecordsCount, lastPage } = response.data;

      dispatch(
        createTodoSuccess({
          todos: todoItems,
          total: totalRecordsCount,
          current: lastPage,
        }),
      );
    })
    .catch((error) => {
      dispatch(showAlert(getError(error)));
    });
};

export const editTodoItem = (todoId, todoItemUpdates) => (dispatch) => {
  axios
    .patch(`/api/v1/todos/${todoId}`, todoItemUpdates)
    .then((response) => {
      const { todo } = response.data;

      dispatch(editTodoSuccess(todo));
    })
    .catch((err) => {
      dispatch(showAlert(getError(err)));
    });
};

export const deleteTodoItem = (todoId, currentPage, recordPerPage) => (dispatch) => {
  axios
    .delete(`/api/v1/todos/${todoId}`)
    .then((response) => {
      const { todoItems, totalRecordsCount } = response.data;
      const ItemsOnLastPage = todoItems.length % recordPerPage;
      dispatch(
        deleteTodoSuccess({
          todos: todoItems,
          total: totalRecordsCount,
          current:
              ItemsOnLastPage === 0 && currentPage !== 1
                ? currentPage - 1
                : currentPage,
        }),
      );
    })
    .catch(() => {
      dispatch(showAlert("could not delete the item"))
    });
};

// pagination action

export const fetchTodoItemsByPageNumber = (pageNum) => (dispatch) => {
  axios
    .get(`/api/v1/todos?page=${pageNum}`)
    .then((response) => {
      const { todos, todoCount } = response.data;
      dispatch(
        getTodoItemsSuccess({ todos, total: todoCount, current: pageNum }),
      );
    })
    .catch(() => {
      dispatch(showAlert("could not fetch the data"))
    });
};
