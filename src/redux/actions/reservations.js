import axios from 'axios';
import { GET_MY_RESERVATIONS, DELETE_RESERVATION } from '.';
import { getToken } from './auth';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
});

const getReservationsSuccess = (reservations) => ({
  type: GET_MY_RESERVATIONS,
  payload: reservations,
});
export const getReservations = () => (dispatch) => {
  request.get('http://localhost:3001/v1/reservations').then((response) => {
    const reservations = response.data.map((reservation) => reservation.attributes);
    dispatch(getReservationsSuccess(reservations));
  });
};

const cancelReservationSuccess = (reservations) => ({
  type: DELETE_RESERVATION,
  payload: reservations,
});
export const cancelReservation = (id) => (dispatch) => {
  request.delete(`http://localhost:3001/v1/reservations/${id}`).then((response) => {
    const reservations = response.data.reservations.map((reservation) => reservation.attributes);
    dispatch(cancelReservationSuccess(reservations));
  });
};

export default getReservations;
