import { ADD_JOURNEYMAN, LOAD_JOURNEYMEN } from '../actions/.';

const initialState = [];

const journeymenReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_JOURNEYMEN:
      return action.payload;
    case ADD_JOURNEYMAN:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default journeymenReducer;
