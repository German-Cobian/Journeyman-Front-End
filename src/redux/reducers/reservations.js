import { FETCH_RESERVATIONS } from '../actions/.';

const initialState = [];

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS:
      return action.payload;
    default:
      return state;
  }
};

export default reservationsReducer;
