import { GET_MY_RESERVATIONS, DELETE_RESERVATION } from '../actions';

const initialState = [];

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_RESERVATIONS:
      return action.payload;
    case DELETE_RESERVATION:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default reservationsReducer;
