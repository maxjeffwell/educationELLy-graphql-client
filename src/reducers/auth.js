import { AUTH_USER, AUTH_ERROR, CLEAR_AUTH } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  token: null
};

export default function(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: action.payload};
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    case CLEAR_AUTH:
      return {...state, token: action.payload};
    default:
      return state;
  }
};
