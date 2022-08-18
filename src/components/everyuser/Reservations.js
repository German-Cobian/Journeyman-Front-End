import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getReservations from '../../redux/actions/reservations';
import Reservation from './Reservation';

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  return (
    <main>
      {reservations.map((reservation, id) => (
        <Reservation
          key={reservation.id}
          id={reservation.id}
          startDate={reservation.start_date}
          numberDays={reservation.number_days}
          cost={reservation.cost}
          journeymanId={reservation.journeyman_id}
        />
      ))}
    </main>
  );
};

export default Reservations;
