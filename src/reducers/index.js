import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
// import studentsReducer from './studentsReducer';

export default combineReducers({
  auth,
  form: formReducer,
  // students: studentsReducer
});
