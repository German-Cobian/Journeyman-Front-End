import { combineReducers } from 'redux';
import authReducer from './auth';
import jopurneymenReducer from './journeymen';

const rootReducer = combineReducers({
  auth: authReducer,
  journeymen: journeymenReducer,
});

export default rootReducer;
