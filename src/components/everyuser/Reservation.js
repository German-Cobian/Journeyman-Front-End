import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/actions/auth';
import { cancelReservation } from '../../redux/actions/reservations';

function Reservation({
  id, startDate, numberDays, cost, journeymanId,
}) {

  const [journeymanName, setJourneymanName] = useState('');
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
      }
    })();
  }, [journeymanId]);

  const deleteReservation = () => {
    dispatch(cancelReservation(id));
  };

  return (
    <main>
      <div className="d-flex flex-row border border-dark my-3 mx-5">
        <div className="my-3 mx-5">
          <h2>{journeymanName}</h2>
          <br />
          <div className="d-flex flex-row">
            <p>
              <strong>From: </strong>
                {' '}
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(new Date(startDate))}
              {'   '}
                <strong>To: </strong>
                {' '}
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(addDays(startDate, numberDays)))}
            </p>
            <p className="mx-5">
              <strong>Total days:</strong>
                {' '}
                {numberDays}
            </p>
            <p className="mx-5">
              <strong>Cost:</strong>
                {' '}
                {cost}
            </p>
            <div>
              <button onClick={deleteReservation} type="button" className="btn btn-danger">
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