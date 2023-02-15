/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';

const CreateReservation = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

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
        <h2 className="my-5">Book a Reservation</h2>
        <form className="my-5 d-flex flex-row justify-content-center border border-dark" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="my-5 mx-5">  
            <div className="my-3">
              <label htmlFor="username">
                Username:
                <input className="form-control form-control-sm" type="" value={currentUser.username} disabled />
              </label>
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
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
                For These many Days:
              </label>
              <input
                className=""
                id="number_days"
                type="number"
                name="number_days"
                placeholder="For these many days"
                {...register('number_days', { required: 'Number of days is required' })}
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
              <button className="btn btn-primary btn-sm" type="submit" >
                Create Reservation
              </button>
              <Link className="mx-3" to="/">Your Reservations</Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateReservation;
