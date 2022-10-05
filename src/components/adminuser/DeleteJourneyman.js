import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import { displayJourneymen, deleteJourneyman } from '../../redux/actions/journeymen';
import '../stylesheets/admin.css';

const DeleteJourneymanForm = () => {
  const journeymen = useSelector((state) => state.journeymen);
  const [slideIndex, setSlideIndex] = useState(0);
  const dispatch = useDispatch();
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
    <main>
      <div>
        <div ref={journeymanCard} className="d-flex flex-row my-5">
          {
            journeymen.map((journeyman) => (
              <div key={journeyman.id} className="d-flex flex-column align-items-center border border-dark rounded my-5 mx-5">
                <img src={journeyman.image_url} className="journeyman-image mx-5 my-3" alt="" />
                <div>
                  <div className="d-flex flex-column mx-5 my-5">
                    <p className="mx-2">
                      <span className="label-style">Journeyman Name: </span>
                      {journeyman.name}
                    </p>
                    <p className="mx-2">
                      <span className="label-style">Journeyman Skill: </span>
                      {journeyman.skill}
                    </p>
                    <p className="mx-2">
                      <span className="label-style">Country: </span>
                      {journeyman.country}
                    </p>
                    <p className="mx-2">
                      <span className="label-style">City: </span>
                      {journeyman.city}
                    </p>
                    <p className="mx-2">
                      <span className="label-style">Price per Day: </span>
                      $
                      {journeyman.price}
                    </p>
                  </div>
                </div>
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-danger py-2 px-5"
                    onClick={() => dispatch(deleteJourneyman(journeyman.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="d-flex flex-row justify-content-between">
          <button type="button" onClick={nextSlide} className="btn btn-primary py-2 px-5 mx-5">
            <VscTriangleRight />
          </button>
          <button type="button" onClick={prevSlide} className="btn btn-primary py-2 px-5 mx-5">
            <VscTriangleLeft />
          </button>
        </div>
      </div>
    </main>
  );
};

export default DeleteJourneymanForm;
