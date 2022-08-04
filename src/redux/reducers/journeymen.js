import { ADD_JOURNEYMAN } from '../actions/.';

const initialState = [];

const journeymenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOURNEYMAN:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default journeymenReducer;
