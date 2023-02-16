import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { displayJourneymen } from '../redux/actions/journeymen';

const Journeyman = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayJourneymen());
  },
  [dispatch]);

  const journeymen = useSelector((state) => state.journeymen);
  const { id } = useParams();

  const filteredJourneymen = journeymen.filter((journeyman) => journeyman.id == id);


  return (
    <div className="">
      <div className="d-flex flex-column align-items-center">
        <div>
          <h2 className="mt-5 mx-5">Journeyman</h2>
        </div>
        {filteredJourneymen.map((item) => (
          <div className="card my-5 mx-3" key={item.id + 1}>
            <div className="my-5 mx-5">
              <img className="" src={item.image_url} width="200" height="200" alt="journeyman-img" />
            </div>
            <div className="mx-5">
              <p className="text-secondary">
                Name:
                {' '}
                {item.name}
              </p>
              <p className="text-secondary">
                Skill:
                {' '}
                {item.skill}
              </p>
              <p className="text-secondary">
                Country:
                {' '}
                {item.country}
              </p>
              <p className="text-secondary">
                City:
                {' '}
                {item.city}
              </p>
              <p className="text-secondary">
                Price:
                {' '}
                $
                {item.price}
              </p>
            </div>
            <div className="my-5 mx-5">
              <Link id={item.id} to={`/create-reservation/${item.id}`}>
                <button className="btn btn-primary py-2 px-5" type="button">Reserve</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Journeyman;
