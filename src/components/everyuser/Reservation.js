import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/actions/auth';
import { cancelReservation } from '../../redux/actions/reservations';
import '../stylesheets/reservations.css';

function Reservation({
  id, startDate, numberDays, cost, journeymanId,
}) {
  const [journeymanName, setJourneymanName] = useState('');
  const [journeymanSkill, setJourneymanSkill] = useState('');
  const [journeymanImage, setJourneymanImage] = useState('');
  const dispatch = useDispatch();

  function addDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/v1/journeymen/${journeymanId}`, {
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
        setJourneymanSkill(data.skill);
        setJourneymanImage(data.image_url);
      }
    })();
  }, [journeymanId]);

  const deleteReservation = () => {
    dispatch(cancelReservation(id));
  };

  return (
    <main>
      <div className="border border-dark rounded mx-5 my-5">
        <div className="d-flex flex-column flex-md-row justify-content-start">
          <img src={journeymanImage} className="journeyman-image mx-5 my-3" alt="journeyman" />
          <div>
            <h2 className="mx-5 mt-5">{journeymanName}</h2>
            <h3 className="mx-5">{journeymanSkill}</h3>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="my-3 mx-5">
            <div className="d-flex flex-column flex-md-row">
              <p className="mx-2">
                <strong>From:</strong>
                {' '}
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(startDate))}
              </p>
              <p className="mx-2">
                <strong>To:</strong>
                {' '}
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(addDays(startDate, numberDays)))}
              </p>
              <p className="mx-2">
                <strong>Total days:</strong>
                {' '}
                {numberDays}
              </p>
              <p className="mx-2">
                <strong>Cost:</strong>
                {' '}
                {cost}
              </p>
            </div>
            <div>
              <button onClick={deleteReservation} type="button" className="btn btn-danger py-2 px-5">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Reservation.propTypes = {
  id: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  numberDays: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  journeymanId: PropTypes.number.isRequired,
};

export default Reservation;
