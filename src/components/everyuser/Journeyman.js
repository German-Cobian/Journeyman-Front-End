import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { displayJourneyman } from '../../redux/actions/journeyman';
import '../stylesheets/journeymen.css';

const Journeyman = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const journeyman = useSelector((state) => state.journeyman);

  useEffect(() => {
    dispatch(displayJourneyman(param.id));
  },
  [dispatch, param.id]);

  return (
    <main>
      <div className="d-flex flex-row justify-content-center my-5">
        <div className="card border border-dark">
          <div className="mx-5">
            <div className="my-5">
              <img src={journeyman.image} className="journeyman-image" alt="journeyman-img" />
              <p>{journeyman.image_url}</p>
            </div>
            <div>
              <p>
                <span className="label-style">Name: </span>
                {journeyman.name}
              </p>
              <div>
                <p>
                  <span className="label-style">Skill: </span>
                  {journeyman.skill}
                </p>
                <p>
                  <span className="label-style">Country: </span>
                  {journeyman.country}
                </p>
                <p>
                  <span className="label-style">City: </span>
                  {journeyman.city}
                </p>
                <p>
                  <span className="label-style">Price: </span>
                  $
                  {journeyman.price}
                </p>
              </div>
            </div>
            <div className="my-5">
              <Link id={journeyman.id} to={`/reserve/${journeyman.id}`}>
                <button className="btn btn-primary py-2 px-5" type="button">Reserve</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Journeyman;
