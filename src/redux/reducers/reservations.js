import { FETCH_RESERVATIONS, CREATE_RESERVATION, CANCEL_RESERVATION } from '../actions/.';

const initialState = [];

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS:
      return action.payload;
    case CREATE_RESERVATION:
      return [...state, action.payload];
    case CANCEL_RESERVATION:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default reservationsReducer;
