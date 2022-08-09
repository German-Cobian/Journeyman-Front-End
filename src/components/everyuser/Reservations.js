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
    <table className="table table-hover">
      <thead className="text-white bg-dark text-center">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Start date</th>
          <th scope="col">Number of days</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  );
};

export default Reservations;