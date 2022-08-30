import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import Social from '../elements/Social';
import { displayJourneymen } from '../../redux/actions/journeymen';
import '../stylesheets/journeymen.css';

const Journeymen = () => {
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
    <main className="">
      <div className="inner-container">
        <div ref={journeymanCard} className="d-flex flex-row my-5">
          {
            journeymen.map((journeyman) => (
              <Link key={journeyman.id} to={`/journeymen/${journeyman.id}`}>
                <div className="card border border-dark my-5 mx-5 bg-light" key={journeyman.id}>
                  <div className="my-5 mx-5">
                    <div className="my-5">
                      <img src={journeyman.image_url} style={{ height: '180px', width: '230px' }} alt="journeyman-img" />
                      <p>{journeyman.image_url}</p>
                    </div>
                    <div className="">
                      <p className="">
                        <span className="label-style">Journeyman Name: </span>
                        {journeyman.name}
                      </p>
                      <div className="border-top border-dark">
                        <p className="my-3">
                          <span className="label-style">Journeyman Skill: </span>
                          {journeyman.skill}
                        </p>
                        <p className="">
                          <span className="label-style">Country: </span>
                          {journeyman.country}
                        </p>
                        <p className="">
                          <span className="label-style">City: </span>
                          {journeyman.city}
                        </p>
                        <p className="">
                          <span className="label-style">Price per Day: </span>
                          $
                          {journeyman.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Social />
                </div>
              </Link>
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

export default Journeymen;
