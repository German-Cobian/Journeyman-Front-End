import { combineReducers } from 'redux';
import authReducer from './auth';
import journeymanReducer from './journeyman';
import journeymenReducer from './journeymen';

const rootReducer = combineReducers({
  auth: authReducer,
  journeymen: journeymenReducer,
  journeyman: journeymanReducer,
});

export default rootReducer;
