import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayJourneymen, deleteJourneyman } from '../redux/actions/journeymen';

const DeleteJourneymanForm = () => {
  const journeymen = useSelector((state) => state.journeymen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (journeymen.length === 0) {
      dispatch(displayJourneymen());
    }
  }, []);

  return (
    <main className="">
      <div className="d-flex flex-column align-items-center mx-5">
        {journeymen.map((journeyman) => (
          <div key={journeyman.id} className="card my-5 mx-5">
            <div className="my-3 mx-5">
              <img src={journeyman.image_url} alt="journeyman-img" width="150" height="150" />
            </div>
            <div className="border border-light">
              <div className="my-5 mx-5">
                <p className="">{journeyman.name}</p>
                <p className="">{journeyman.skill}</p>
                <p className="">{journeyman.country}</p>
                <p className="">{journeyman.city}</p>
                <p className="">{journeyman.price}</p>
              </div>
              <div className="mx-5 my-5">
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
    </main>
  );
};

export default DeleteJourneymanForm;
