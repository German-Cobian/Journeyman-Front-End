import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../../redux/actions/auth';

const ReservationForm = () => {
  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

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
            <div className="form group my-5 mx-5">
              <input className="form-control form-control-lg" type="start_date" placeholder="Start date" {...register('start_date', { required: 'Start_date is required' })} />
            </div>
            <div className="form-group my-5 mx-5">
              <input className="form-control form-control-lg" type="number-days" placeholder="Total of days" {...register('number_days', { required: 'number_days is required' })} />
            </div>
            <div className="my-5">
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
