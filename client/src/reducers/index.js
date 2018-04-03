import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import coins from './coins';

const rootReducer = combineReducers({
  user,
  flash
});

export default rootReducer;
