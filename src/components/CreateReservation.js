/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';

const CreateReservation = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const [journeymanImage, setJourneymanImage] = useState('');
  const [journeymanName, setJourneymanName] = useState('');
  const [journeymanSkill, setJourneymanSkill] = useState('');

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
        setJourneymanImage(data.image_url)
        setJourneymanName(data.name);
        setJourneymanSkill(data.skill);
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
      navigate('/'); 
    } else {
      console.log(data);
    }
  };

  return (
    <main className="">
      <div className="d-flex flex-column align-items-center my-5">
        <h2 className="">Book a Reservation</h2>
        <form className="d-flex flex-row justify-content-center border border-dark my-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mx-5">
            <div className="my-4">
              <p>
                <strong>{currentUser.username}</strong>
                {' '}
                intends to make the following reservation:
              </p>
              
            </div>
            <div className="d-flex flex-row justify-content-between border border-primary my-3">
              <div className="py-3 px-3">
                <img className="" src={journeymanImage} width="100" height="100" alt="journeyman-img" />
              </div>
              <div className="d-flex flex-column py-3 px-3">
                <label htmlFor="username">
                  Journeyman name:
                  <input className="form-control form-control-sm" type="" value={journeymanName} disabled />
                </label>
                <label htmlFor="username">
                  Journeyman skill:
                  <input className="form-control form-control-sm" type="" value={journeymanSkill} disabled />
                </label>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between my-4">
              <label
                className=""
                htmlFor="start-date"
              >
                Start date:
              </label>
              <input
                className=""
                id="start_date"
                type="date"
                name="start_date"
                placeholder="Reserve for start date"
                {...register('start_date', { required: 'Start date is required' })}
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
              <label
                className=""
                htmlFor="number-of-days"
              >
                For number of days:
              </label>
              <input
                className=""
                id="number_days"
                type="number"
                name="number_days"
                placeholder="These many days"
                {...register('number_days', { required: 'Number of days is required' })}
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-4">
              <button className="btn btn-primary btn-sm" type="submit" >Create Reservation</button>
              <Link className="mx-3" to="/">Your Reservations</Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateReservation;
