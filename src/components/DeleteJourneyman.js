import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayJourneymen, deleteJourneyman } from '../redux/actions/journeymen';

const DeleteJourneymanForm = () => {
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
  }, []);

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
    <main className="">
      <div className="">
        <div ref={journeymanCard} className="d-flex flex-row">
          {journeymen.map((journeyman) => (
            <div key={journeyman.id} className="d-flex flex-column align-items-center border border-light my-3 mx-3">
              <div className="my-3 mx-5">
                <img src={journeyman.image_url} alt="journeyman-img" width="150" height="150" />
              </div>
              <div className="div-flex flex-column my-3 mx-5">
                <p className="">
                  <span className="font-weight-bold">Journeyman Name: </span>
                  {journeyman.name}
                </p>
                <p className="">
                  <span className="font-weight-bold">Journeyman Skill: </span>
                  {journeyman.skill}
                </p>
                <p className="">
                  <span className="font-weight-bold">Country: </span>
                  {journeyman.country}
                </p>
                <p className="">
                  <span className="font-weight-bold">City: </span>
                  {journeyman.city}
                </p>
                <p className="">
                  <span className="font-weight-bold">Price per Day: </span>
                  $
                  {journeyman.price}
                </p>
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => dispatch(deleteJourneyman(journeyman.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
  );
};

export default DeleteJourneymanForm;
