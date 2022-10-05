import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import Social from '../elements/Social';
import { displayJourneymen } from '../../redux/actions/journeymen';


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
      <div className="">
        <div ref={journeymanCard} className="d-flex flex-row my-5">
          {
            journeymen.map((journeyman) => (
              <Link key={journeyman.id} to={`/journeymen/${journeyman.id}`}>
                <div className="border border-dark mx-5" key={journeyman.id}>
                  <div className="mx-5">
                    <div className="my-5">
                      <img className="" src={journeyman.image_url} width="50" alt="journeyman-img" />
                    </div>
                    <div className="">
                      <p className="">
                        Name: {journeyman.name}
                      </p>
                      <div className="">
                        <p className="">
                          Skill: {journeyman.skill}
                        </p>
                        <p className="">
                          Country: {journeyman.country}
                        </p>
                        <p className="">
                          City: {journeyman.city}
                        </p>
                        <p className="">
                          Price: ${journeyman.price}
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
        <button type="button" onClick={nextSlide} className="mx-5">
          <VscTriangleRight />
        </button>
        <button type="button" onClick={prevSlide} className="mx-5">
          <VscTriangleLeft />
        </button>
      </div>
    </main>
  );
};

export default Journeymen;