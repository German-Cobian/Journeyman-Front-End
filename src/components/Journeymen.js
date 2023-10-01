import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { displayJourneymen } from '../redux/actions/journeymen';
import './outlet.css';

function Journeymen() {
  const dispatch = useDispatch();
  const journeymen = useSelector((state) => state.journeymen);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
 
  window.addEventListener('resize', () => {
    setWidthScreen(window.innerWidth);
  });

  useEffect(() => {
    if (journeymen.length === 0) {
      dispatch(displayJourneymen());
    }
  }, [dispatch, journeymen.length]);

  return (
    <div className="container">
      <h2 className="mt-3 mx-5">Journeymen</h2>
      <Swiper
        slidesPerView={widthScreen > 799 ? 3 : 1}
        spaceBetween={30}
        slidesPerGroup={widthScreen > 799 ? 3 : 1}
        loop
        loopFillGroupWithBlank
        pagination={{clickable: true,}}
        navigation
        modules={[Pagination, Navigation]}
        className="swiper"
      >
        <div className="">
          {journeymen.map((journeyman) => (
            <SwiperSlide key={journeyman.id} className="">
              <Link  to={`/journeymen/${journeyman.id}`} className="text-decoration-none">
                <div className="card my-3 mx-3">
                  <div className="">
                    <div className="my-3 mx-5">
                      <img className="" src={journeyman.image_url} width="150" height="150" alt="journeyman-img" />
                    </div>
                    <div className="my-3 mx-5">
                      <p className="text-secondary">
                        <strong>Name: </strong>
                        {journeyman.name}
                      </p>
                      <div className="">
                        <p className="text-secondary">
                          <strong>Skill: </strong>
                          {journeyman.skill}
                        </p>
                        <p className="text-secondary">
                          <strong>Country: </strong>
                          {journeyman.country}
                        </p>
                        <p className="text-secondary">
                          <strong>City: </strong>
                          {journeyman.city}
                        </p>
                        <p className="text-secondary">
                          <strong>Price: </strong>
                          $
                          {journeyman.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  )
};

export default Journeymen;
