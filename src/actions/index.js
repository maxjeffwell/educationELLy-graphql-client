import axios from 'axios';

import {API_BASE_URL} from "../config";
import {FETCH_STUDENTS, AUTH_ERROR, AUTH_USER } from "./types";

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
