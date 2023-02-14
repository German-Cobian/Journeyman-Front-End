import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';

function Reservation({
  id, startDate, daysNumber, cost,
}) {
  const navigate = useNavigate();

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
    <div>
      <p>{id + 1}</p>
      <p>{startDate}</p>
      <p>{daysNumber}</p>
      <p>{cost}</p>
      <div>
        <button onClick={deleteReservation} type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  )
}

Reservation.propTypes = {
  id: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  daysNumber: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};

export default Reservation;
