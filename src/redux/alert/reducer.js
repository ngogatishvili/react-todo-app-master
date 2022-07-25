import { HIDE_ALERT, SHOW_ALERT } from './constants';

const initialState = {
  message: '',
};

const alertReducer = (state = initialState, action) => {
  switch (action?.type) {
    case SHOW_ALERT:
      return {
        ...state,
        message: action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
};

export default alertReducer;
