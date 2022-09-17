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
      <ul className="">
        {journeymen.map((journeyman) => (
          <li key={journeyman.id} className="">
            <img src={journeyman.image} alt="" className="" />
            <div className="">
              <div className="">
                <p className="">{journeyman.name}</p>
                <p className="">{journeyman.skill}</p>
                <p className="">{journeyman.country}</p>
                <p className="">{journeyman.city}</p>
                <p className="">{journeyman.price}</p>
              </div>
              <div className="">
                <button
                  type="button"
                  className=""
                  onClick={() => dispatch(deleteJourneyman(journeyman.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DeleteJourneymanForm;
