import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/actions/auth';
import { cancelReservation } from '../../redux/actions/reservations';

function Reservation({
  id, startDate, numberDays, cost, journeymanId,
}) {

  const [journeymanName, setJourneymanName] = useState('');
  const [journeymanImage, setJourneymanImage] = useState('');
  const dispatch = useDispatch();

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
        setJourneymanImage(data.image_url);
      }
    })();
  }, [journeymanId]);

  const deleteReservation = () => {
    dispatch(cancelReservation(id));
  };

  return (
    <main>
      <div className="">
        <img src={journeymanImage} alt="journeyman" />
        <p>{journeymanImage}</p>
        <h2>{journeymanName}</h2>
      </div>
      <tr>
        <td>{id}</td>
        <td>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(startDate))}
        </td>
        <td>{numberDays}</td>
        <td>{cost}</td>
        <td>
          <button onClick={deleteReservation} type="button" className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
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