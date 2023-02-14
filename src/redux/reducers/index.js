import { combineReducers } from 'redux';
import authReducer from './auth';
import journeymenReducer from './journeymen';
import reservationsReducer from './reservations';

const rootReducer = combineReducers({
  auth: authReducer,
  journeymen: journeymenReducer,
  reservations: reservationsReducer,
});

export default rootReducer;
