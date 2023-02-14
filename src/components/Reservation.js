import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';

function Reservation({
  id, journeymanId, startDate, daysNumber, cost,
}) {
  const navigate = useNavigate();

  const [journeymanImage, setJourneymanImage] = useState('');
  const [journeymanName, setJourneymanName] = useState('');
  const [journeymanSkill, setJourneymanSkill] = useState('');

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
        console.log(data)
        setJourneymanImage(data.image_url);
        setJourneymanName(data.name);
        setJourneymanSkill(data.skill)
      }
    })();
  }, []);

  const deleteReservation = async () => {
    const response = await fetch(`http://localhost:3001/v1/reservations/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });
    navigate(0);
    if (response.ok) {
      console.log('Reservation deleted');
    } else {
      console.log(response);
    }
  };

  return (
    <main>
      <div className="border border-dark rounded mx-5 my-5">
        <div className="d-flex flex-column align-items-center border border-light my-3 mx-3">
          <img className="my-2 mx-5" src={journeymanImage} width="150" height="150" alt="journeyman-img" />
          <p className="mx-5"><strong>{journeymanName}</strong></p>
          <p className="mx-5"><strong>{journeymanSkill}</strong></p>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <p className="mx-3">
            <strong>From:</strong>
            {' '}
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(startDate))}
          </p>
          <p className="mx-3">
            <strong>To:</strong>
            {' '}
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(addDays(startDate, daysNumber)))}
          </p>
          <p className="mx-3">
            <strong>Total days:</strong>
            {' '}
            {daysNumber}
          </p>
          <p className="mx-3">
            <strong>Cost:</strong>
            {' '}
            $
            {cost}
          </p>
        </div>
        <div>
          <button className="btn btn-danger my-3 mx-3" type="button" onClick={deleteReservation}>
            Delete
          </button>
        </div>
      </div>
    </main>
  )
}

Reservation.propTypes = {
  id: PropTypes.number.isRequired,
  journeymanId: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  daysNumber: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};

export default Reservation;
