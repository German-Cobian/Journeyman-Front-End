import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { displayJourneymen } from '../redux/actions/journeymen';

const Journeymen = () => {
  const dispatch = useDispatch();
  const journeymen = useSelector((state) => state.journeymen);
  const [slideIndex, setSlideIndex] = useState(0);
  const lenghtJourneymen = journeymen.length;
  const journeymanCard = useRef();
  const size = 250;

  useEffect(() => {
    if (journeymen.length === 0) {
      dispatch(displayJourneymen());
    }
  }, [dispatch, journeymen.length]);

  const nextSlide = () => {
    if (slideIndex === lenghtJourneymen - 1) return;
    const current = slideIndex + 1;
    journeymanCard.current.style.transform = `translateX(${-size * current}px)`;
    setSlideIndex(current);
  };

  const prevSlide = () => {
    if (slideIndex === 0) return;
    const current = slideIndex - 1;
    journeymanCard.current.style.transform = `translateX(${-size * current}px)`;
    setSlideIndex(current);
  };

  return (
    <div className="">
      <h2 className="mx-5 mt-5">Journeymen</h2>
      <div ref={journeymanCard} className="d-flex flex-row justify-content-between">
        {journeymen.map((journeyman) => (
          <Link key={journeyman.id} to={`/journeymen/${journeyman.id}`}>
            <div key={journeyman.id} className="card my-5 mx-3">
              <div className="">
                <div className="my-5 mx-5">
                  <img className="" src={journeyman.image_url} width="150" height="150" alt="journeyman-img" />
                </div>
                <div className="my-3 mx-5">
                  <p className="text-secondary">
                    Name:
                    {' '}
                    {journeyman.name}
                  </p>
                  <div className="">
                    <p className="text-secondary">
                      Skill:
                      {' '}
                      {journeyman.skill}
                    </p>
                    <p className="text-secondary">
                      Country:
                      {' '}
                      {journeyman.country}
                    </p>
                    <p className="text-secondary">
                      City:
                      {' '}
                      {journeyman.city}
                    </p>
                    <p className="text-secondary">
                      Price:
                      {' '}
                      {journeyman.price}
                      $
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="d-flex flex-row justify-content-between">
        <button className="btn btn-primary btn-lg" type="button" onClick={nextSlide}>
          Right
        </button>
        <button className="btn btn-primary btn-lg" type="button" onClick={prevSlide}>
          Left
        </button>
      </div>  
    </div>
  )
};

export default Journeymen;
