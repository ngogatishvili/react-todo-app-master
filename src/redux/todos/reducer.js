import {
  SET_LOADING,
  GET_TODO_ITEMS_SUCCESS,
  CREATE_TODO_ITEM_SUCCESS,
  EDIT_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM_SUCCESS,
  ADD_TODO_ACTION,
  DELETE_TODO_ACTION,
  EDIT_TODO_ACTION
} from './constants';

const initialState = {
  isLoading: false,
  recordPerPage: 5,
  todoItems: [],
  totalCount: 0,
  currentPage: 1,
  lastAction: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODO_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todoItems: action.payload.todos,
        totalCount: action.payload.total,
        currentPage: action.payload.current,
        lastAction: '',
      };
    case CREATE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        todoItems: action.payload.todos,
        totalCount: action.payload.total,
        currentPage: action.payload.current,
        lastAction: ADD_TODO_ACTION,
      };
    case EDIT_TODO_ITEM_SUCCESS:
      return {
        ...state,
        todoItems: state.todoItems.map((item) => (item._id === action.payload._id
          ? action.payload : item)),
        lastAction: EDIT_TODO_ACTION,
      };
    case DELETE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        todoItems: action.payload.todos,
        totalCount: action.payload.total,
        currentPage: action.payload.current,
        lastAction: DELETE_TODO_ACTION,
      };
    default:
      return state;
  }
};

export default todoReducer;
