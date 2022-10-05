import { GET_JOURNEYMAN } from '../actions';

const initialState = [];

const journeymanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOURNEYMAN:
      return action.payload;
    default:
      return state;
  }
};

export default journeymanReducer;
