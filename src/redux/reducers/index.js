import { combineReducers } from 'redux';
import authReducer from './auth';
import journeymanReducer from './journeyman';
import journeymenReducer from './journeymen';
import reservationsReducer from './reservations';

const rootReducer = combineReducers({
  auth: authReducer,
  journeymen: journeymenReducer,
  journeyman: journeymanReducer,
  reservations: reservationsReducer,
});

export default rootReducer;
