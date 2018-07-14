import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import alerts from './alertReducer';

const store = combineReducers({
  user,
  login,
  alerts,
});

export default store;
