import axios from 'axios';
import { FETCH_RESERVATIONS, CREATE_RESERVATION, CANCEL_RESERVATION } from '.';
import { getToken } from './auth';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
});

// addReservation method does not work, it is included for ilustrational purposes only
export const addReservationSuccess = (reservation) => ({
  type: CREATE_RESERVATION,
  payload: reservation,
});
export const addReservation = (reservation) => (dispatch) => {
  request.post('http://localhost:3001/v1/reservations', reservation).then((response) => {
    dispatch(addReservationSuccess(response.data.attributes));
  });
};

const displayReservationsSuccess = (reservations) => ({
  type: FETCH_RESERVATIONS,
  payload: reservations,
});
export const displayReservations = () => (dispatch) => {
  request.get('http://localhost:3001/v1/reservations').then((response) => {
    const reservations = response.data.map((reservation) => reservation.attributes);
    dispatch(displayReservationsSuccess(reservations));
  });
};

const cancelReservationSuccess = (reservations) => ({
  type: CANCEL_RESERVATION,
  payload: reservations,
});
export const cancelReservation = (id) => (dispatch) => {
  request.delete(`http://localhost:3001/v1/reservations/${id}`).then((response) => {
    const reservations = response.data.reservations.map((reservation) => reservation.attributes);
    dispatch(cancelReservationSuccess(reservations));
  });
};
