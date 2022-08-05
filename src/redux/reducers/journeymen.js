import { ADD_JOURNEYMAN, DELETE_JOURNEYMAN } from '../actions/.';

const initialState = [];

const journeymenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOURNEYMAN:
      return [...state, action.payload];
    case DELETE_JOURNEYMAN:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default journeymenReducer;
