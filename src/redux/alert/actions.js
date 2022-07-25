import { SHOW_ALERT, HIDE_ALERT } from './constants';

export const showAlert = (payload) => ({
  type: SHOW_ALERT,
  payload
});

export const hideAlert = () => ({
  type: HIDE_ALERT,
});
