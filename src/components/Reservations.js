import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayReservations } from '../redux/actions/reservations';

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  return (
    <div className="">
      <h2>Reservations</h2>
      {reservations.map((reservation) => (
      <div key={reservation.id + 1}>
        <p>{reservation.user_id}</p>
        <p>{reservation.journeyman_id}</p>
        <p>{reservation.start_date}</p>
        <p>{reservation.number_days}</p>
        <p>{reservation.cost}</p>
      </div>
      ))};
    </div>
  )
};

export default Reservations;
