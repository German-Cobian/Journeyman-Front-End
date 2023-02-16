import { FETCH_RESERVATIONS, CREATE_RESERVATION, CANCEL_RESERVATION } from '.';
import { getToken } from './auth';

// addReservation method does not work, it is included for ilustrational purposes only
export const addReservation = (reservation) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/v1/reservations', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
    body: JSON.stringify(reservation),
  });
  if (response.ok) {
    const { data } = await response.json();
    dispatch({ 
      type: CREATE_RESERVATION,
      payload: {
        user_id: data.user_id,
        journeyman_id: data.journeyman_id,
        start_date: data.start_date,
        number_days: data.number_days
      } 
    });
  }
}

export const displayReservations = () => async (dispatch) => {
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

export const cancelReservation = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/v1/reservations/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  if (response.ok) dispatch({ type: CANCEL_RESERVATION, payload: id });
};
