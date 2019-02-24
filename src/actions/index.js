import axios from 'axios';

import {API_BASE_URL} from "../config";

export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';
// export const FETCH_STUDENTS = 'FETCH_STUDENTS';

// export const signup = (formProps, callback) => async dispatch => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}`, formProps);
//     dispatch({ type: AUTH_SIGNUP, payload: response.data.token });
//
//     localStorage.setItem('jwtToken', response.data.token);
//     callback();
//
//   } catch(e) {
//     dispatch({ type: AUTH_ERROR, payload: 'This email is in use. Please register using a different email.' });
//   }
// };

export const signIn = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, formProps);
    dispatch({type: AUTH_SIGNIN, payload: response.data.token});

    localStorage.setItem('jwtToken', response.data.token);
    callback();

  } catch (e) {
    dispatch({type: AUTH_ERROR, payload: 'Invalid login email or password. Please try logging in again.'});
  }
};

export const signOut = () => {
  localStorage.removeItem('token');
  return {type: AUTH_SIGNOUT};
};

// export const fetchStudents = () => async dispatch => {
//   let token = localStorage.getItem('jwtToken');
//   let config = { headers: {'Authorization': "bearer " + token} };
//
//   const res = await axios.get(`${API_BASE_URL}`, config);
//
//   dispatch({ type: FETCH_STUDENTS, payload: res.data });
// };


