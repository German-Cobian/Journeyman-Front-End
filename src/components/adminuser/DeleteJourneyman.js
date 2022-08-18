import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayJourneymen, deleteJourneyman } from '../../redux/actions/journeymen';

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
      <div className="">
        <ul className="">
          {journeymen.map((journeyman) => (
            <li key={journeyman.id} className="d-flex flex-row justify-content-center border border-dark rounded my-5 mx-5">
              <img src={journeyman.image} alt="" className="" />
              <div className="">
                <div className="d-flex flex-sm-column flex-md-row">
                  <p className="mx-2 my-5">
                    <span className="label-style">Journeyman Name: </span>
                    {journeyman.name}
                  </p>
                  <p className="mx-2 my-5">
                    <span className="label-style">Journeyman Skill: </span>
                    {journeyman.skill}
                  </p>
                  <p className="mx-2 my-5">
                    <span className="label-style">Country: </span>
                    {journeyman.country}
                  </p>
                  <p className="mx-2 my-5">
                    <span className="label-style">City: </span>
                    {journeyman.city}
                  </p>
                  <p className="mx-2 my-5">
                    <span className="label-style">Price per Day: </span>
                    $ {journeyman.price}</p>
                </div>
                <div className="mx-2 my-3">
                  <button
                    type="button"
                    className="btn btn-danger py-2 px-5"
                    onClick={() => dispatch(deleteJourneyman(journeyman.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default DeleteJourneymanForm;
