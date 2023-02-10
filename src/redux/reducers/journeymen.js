import { FETCH_JOURNEYMEN } from '../actions/.';

const initialState = [];

const journeymenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOURNEYMEN:
      return action.payload;
    default:
      return state;
  }
};

export default journeymenReducer;
