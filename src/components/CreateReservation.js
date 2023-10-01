/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';
import { addReservation } from '../redux/actions/reservations';
import './outlet.css';

const CreateReservation = () => {
  const { reset } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const [journeymanImage, setJourneymanImage] = useState('');
  const [journeymanName, setJourneymanName] = useState('');
  const [journeymanSkill, setJourneymanSkill] = useState('');
  const [reservation, setReservation] = useState({});

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
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    const data = new FormData();
    
    data.append('user_id', currentUser.id);
    data.append('journeyman_id', parseInt(id, 10));
    data.append('start_date', reservation.start_date);
    data.append('number_days', reservation.number_days);
   
    dispatch(addReservation(data));
    navigate('/reservations');
    reset();
  };
  

  return (
    <main className="container">
      <div className="d-flex flex-column align-items-center my-3">
        <h2 className="">Book a Reservation</h2>
        <form className="d-flex flex-row justify-content-center border border-dark my-3" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-4">
              <button className="btn btn-primary btn-sm" type="submit" >Create Reservation</button>
              <Link className="mx-3" to="/reservations">Your Reservations</Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateReservation;
