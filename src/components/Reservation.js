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
    <div>
       <img className="" src={journeymanImage} width="150" height="150" alt="journeyman-img" />
      <p>{id + 1}</p>
      <p>{journeymanName}</p>
      <p>{journeymanSkill}</p>
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
  journeymanId: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  daysNumber: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};

export default Reservation;
