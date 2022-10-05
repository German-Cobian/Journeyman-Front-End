import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../../redux/actions/auth';
import '../stylesheets/reservations.css';

const ReservationForm = () => {
  const [error, setError] = useState();
  const [journeymanName, setJourneymanName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/v1/journeymen/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJourneymanName(data.name);
      }
    })();
  }, []);

  const onFormSubmit = async (data) => {
    const response = await fetch('http://localhost:3001/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        journeyman_id: parseInt(id, 10),
        start_date: data.start_date,
        number_days: data.number_days,
      }),
    });

    if (response.ok) {
      navigate('/reservations');
    } else {
      console.log(data.start_date);
      console.log(data.number_days);
      setError('We could not add your reservation.');
    }
  };

  return (
    <main>
      <div className=" d-flex flex-row justify-content-center my-5">
        <div className="border border-dark rounded">
          <div>
            <h2 className="my-5 mx-5">BOOK A RESERVATION</h2>
          </div>
          {error && <p className="">{error}</p>}
          <form className="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group d-flex gap-5 flex-wrap mx-5">
              <div className="">
                <p><strong>Username:</strong></p>
                <p>{currentUser.username}</p>
              </div>
              <div className="">
                <p><strong>Journeyman Name:</strong></p>
                <p>{journeymanName}</p>
              </div>
            </div>
            <div className="form-group d-flex gap-5 flex-wrap mx-5 my-3">
              <div className="">
                <input type="date" placeholder="Start date" {...register('start_date', { required: 'start_date is required' })} className="form-control form-control-lg" />
              </div>
              <div className="">
                <select {...register('number_days', { required: 'number_days is required' })} className="form-control form-control-lg">
                  <option selected="true" disabled="disabled" label="How many days?" />
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
              </div>
            </div>
            <div className="my-3">
              <input className="btn btn-primary mx-5" type="submit" value="Add Reservation" />
              <Link className="" to="/reservations">Your Reservations</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ReservationForm;
