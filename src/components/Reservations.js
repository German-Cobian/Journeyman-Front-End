import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { displayReservations } from '../redux/actions/reservations';
import Reservation from './Reservation';
import './outlet.css';

function Reservations() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
 
  window.addEventListener('resize', () => {
    setWidthScreen(window.innerWidth);
  });

  useEffect(() => {
    dispatch(displayReservations());
  }, [dispatch]);

  return (
    <main className="container">
      <div>
        <h2 className="mt-3 mx-5">Reservations</h2>
      </div>
      <Swiper
        slidesPerView={widthScreen > 799 ? 2 : 1}
        spaceBetween={30}
        slidesPerGroup={widthScreen > 799 ? 2 : 1}
        loop
        loopFillGroupWithBlank
        pagination={{clickable: true,}}
        navigation
        modules={[Pagination, Navigation]}
        className="swiper"
      >
        <div className="d-flex flex-row">
          {reservations.map((reservation, id) => (
            <SwiperSlide id={reservation.id} className="">
              <Reservation
                key={id}
                id={reservation.id}
                journeymanId={reservation.journeyman_id}
                startDate={reservation.start_date}
                daysNumber={reservation.number_days}
                cost={reservation.cost}
              />
            </SwiperSlide>
          ))};
        </div>
      </Swiper>
    </main>
  )
};

export default Reservations;