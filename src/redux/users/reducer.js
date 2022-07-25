import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  CHANGE_USERNAME_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  LOGOUT_USER,
} from './constants';

const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user).name : null,
  img: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.name,
        img: action.payload.img,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.name,
        img: action.payload.img,
      };

    case CHANGE_USERNAME_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        img: action.payload,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
