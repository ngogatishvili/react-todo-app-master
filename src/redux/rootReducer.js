import { combineReducers } from 'redux';

import userReducer from './users/reducer';
import todoReducer from './todos/reducer';
import alertReducer from './alert/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
  alert: alertReducer,
});

export default rootReducer;
