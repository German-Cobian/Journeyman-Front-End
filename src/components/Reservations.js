import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayReservations } from '../redux/actions/reservations';
import Reservation from './Reservation';
import './outlet.css';

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  const [slideIndex, setSlideIndex] = useState(0);
  const lenghtReservations = reservations.length;
  const reservationCard = useRef();
  const size = 250;

  const nextSlide = () => {
    if (slideIndex === lenghtReservations - 1) return;
    const current = slideIndex + 1;
    reservationCard.current.style.transform = `translateX(${-size * current}px)`;
    setSlideIndex(current);
  };

  const prevSlide = () => {
    if (slideIndex === 0) return;
    const current = slideIndex - 1;
    reservationCard.current.style.transform = `translateX(${-size * current}px)`;
    setSlideIndex(current);
  };

  return (
    <main className="container">
      <div>
        <h2 className="mt-3 mx-5">Reservations</h2>
      </div>
      <div className="d-flex flex-row" ref={reservationCard}>
        {reservations.map((reservation, id) => (
          <Reservation
            key={id}
            id={reservation.id}
            journeymanId={reservation.journeyman_id}
            startDate={reservation.start_date}
            daysNumber={reservation.number_days}
            cost={reservation.cost}
          />
        ))};
      </div>
      <div className="d-flex flex-row justify-content-between">
        <button className="btn btn-primary btn-lg" type="button" onClick={nextSlide}>
          Right
        </button>
        <button className="btn btn-primary btn-lg" type="button" onClick={prevSlide}>
          Left
        </button>
      </div>
    </main>
  )
};

export default Reservations;
