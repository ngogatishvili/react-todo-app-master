import axios from 'axios';
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  CHANGE_USERNAME_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  LOGOUT_USER,
} from './constants';

import '../../axios';
import { showAlert } from '../alert/actions';
import getError from '../../utils';

// pure action creators

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});



export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});



export const changeUsernameSuccess = (updatedUsername) => ({
  type: CHANGE_USERNAME_SUCCESS,
  payload: updatedUsername,
});



export const uploadImageSuccess = (image) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: image,
});


export const logout = () => ({
  type: LOGOUT_USER,
});

export const changePasswordSuccess = (success) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: success,
});


// async action creators

export const registerUser = (userInput) => (dispatch) => axios
  .post('/api/v1/auth/register', { ...userInput })
  .then((response) => {
    const { token, user } = response.data;
    dispatch(
      registerUserSuccess({ name: user.name, img: user.selectedFile }),
    );
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        name: user.name,
        id: user.id,
      }),
    );
  })

  .catch((error) => {
    dispatch(showAlert(getError(error)));
  });

export const loginUser = (userInput) => (dispatch) => axios
  .post('/api/v1/auth/login', { ...userInput })
  .then((response) => {
    const { token, user } = response.data;
    dispatch(loginUserSuccess({ name: user.name }));
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        name: user.name,
        id: user.id,
        image: user.image,
      }),
    );
  })
  .catch((error) => {
    dispatch(showAlert(getError(error)));
  });

export const changeUsername = (id, value) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/v1/auth/${id}/changeUsername`, {
      value,
    });
    dispatch(changeUsernameSuccess(data));
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedLocalData = { ...user, name: data };
    localStorage.setItem('user', JSON.stringify(updatedLocalData));
    return data;
  } catch (err) {
    dispatch(showAlert(getError(err)));
  }
};
export const uploadImage = (id, value) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/v1/auth/${id}/uploadImage`, value);

    dispatch(uploadImageSuccess(data));
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedData = { ...user, image: data };
    localStorage.setItem('user', JSON.stringify(updatedData));
    return data;
  } catch (err) {
    dispatch(showAlert(getError(err)));
  }
};

export const updatePassword = (id, value) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `/api/v1/auth/${id}/updatePassword`,
      value,
    );
    dispatch(showAlert(data.msg));
    return { success: data.msg };
  } catch (err) {
    dispatch(showAlert(getError(err)));
  }
};
