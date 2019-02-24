import {
  AUTH_SIGNIN,
  AUTH_ERROR,
  AUTH_SIGNOUT,
} from '../actions';

const INITIAL_STATE = {
  authenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_SIGNIN:
      return {...state, authenticated: true };
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    case AUTH_SIGNOUT:
      return {...state, authenticated: false };
    default:
      return state;
  }
};
