import counterReducer from './counter';
import loggedReducer from './isLogged';
import tokenReducer from './token';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  token: tokenReducer,
});

export default allReducers;
