import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { displayJourneyman } from '../../redux/actions/journeyman';

const Journeyman = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const journeyman = useSelector((state) => state.journeyman);

  useEffect(() => {
    dispatch(displayJourneyman(param.id));
  },
  [dispatch, param.id]);

  return (
    <main className="">
      <div className="d-flex flex-row justify-content-center my-5">
        <div className="border border-dark">
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
            <div className="my-5 mx-5">
              <Link id={journeyman.id} to={`/reserve/${journeyman.id}`}>
                <button className="" type="button">Reserve</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Journeyman;
