import { FETCH_RESERVATIONS } from '.';
import { getToken } from './auth';

const displayReservations = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/v1/reservations', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
  });
  if (response.ok) {
    const data = await response.json();
    const reservations = data.map((reservation) => reservation.attributes);
    dispatch({ type: FETCH_RESERVATIONS, payload: reservations });
    } else {
  dispatch({ type: FETCH_RESERVATIONS, payload: [] });
  }
};

export default displayReservations
