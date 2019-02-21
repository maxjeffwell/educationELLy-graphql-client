import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {API_BASE_URL} from "../config";
import {FETCH_STUDENTS, AUTH_ERROR, AUTH_USER, SET_JWT_TOKEN, AUTH_SUCCESS, AUTH_REQUEST, CLEAR_AUTH} from "./types";
import { normalizeResponseErrors } from './utils';
import {clearJwtToken, saveJwtToken} from "../LocalStorage";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });

    localStorage.setItem('jwtToken', response.data.token);
    callback();

  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'This email is in use. Please register using a different email.' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, formProps);
    dispatch({type: AUTH_USER, payload: response.data.token});

    localStorage.setItem('jwtToken', response.data.token);
    callback();

  } catch (e) {
    dispatch({type: AUTH_ERROR, payload: 'Invalid login email or password. Please try logging in again.'});
  }
}

export const fetchStudents = () => async dispatch => {
  let token = localStorage.getItem('jwtToken');
  let config = { headers: {'Authorization': "bearer " + token} };

  const res = await axios.get(`${API_BASE_URL}`, config);

  dispatch({ type: FETCH_STUDENTS, payload: res.data });
};

export const signout = () => {
  localStorage.removeItem('jwtToken');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const setJwtToken = jwtToken => ({
  type: SET_JWT_TOKEN,
  jwtToken
});

export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const authError = error => ({
  type: AUTH_ERROR,
  error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (jwtToken, dispatch) => {
  const decodedToken = jwtDecode(jwtToken);
  dispatch(setJwtToken(jwtToken));
  dispatch(authSuccess(decodedToken.user));
  saveJwtToken(jwtToken);
};

export const refreshJwtToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const jwtToken = getState().auth.jwtToken;
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${jwtToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({jwtToken}) => storeAuthInfo(jwtToken, dispatch))
    .catch(err => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
      clearJwtToken(jwtToken);
    });
};
