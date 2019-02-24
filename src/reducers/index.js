import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
// import studentsReducer from './studentsReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  // students: studentsReducer
});
