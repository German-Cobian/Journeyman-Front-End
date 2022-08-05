import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
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
    <div className="">
      <div className="">
        <div ref={journeymanCard} className="">
          {
           journeymen.map((journeyman) => (
               <div className="">
                 <div className="">
                   <img className="" src={journeyman.image} alt="journeyman-img" />
                 </div>
                 <div className="">
                   <p className="">
                     Name:
                     {journeyman.name}
                   </p>
                   <div className="">
                     <p className="">
                       Skill:
                       {journeyman.skill}
                     </p>
                     <p className="">
                       Country:
                       {journeyman.country}
                     </p>
                     <p className="">
                       City:
                       {journeyman.city}
                     </p>
                     <p className="">
                       Price:
                       {journeyman.price}
                       $
                     </p>
                   </div>
                 </div>
               </div>
           ))
        }
        </div>
        <button
          type="button"
          className=""
          onClick={nextSlide}
        >
          Right
        </button>
        <button type="button" onClick={prevSlide} className="">
          Left
        </button>
      </div>

    </div>
  );
};

export default Journeymen;