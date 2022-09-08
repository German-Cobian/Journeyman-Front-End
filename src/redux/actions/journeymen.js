import axios from 'axios';
import { ADD_JOURNEYMAN, LOAD_JOURNEYMEN, DELETE_JOURNEYMAN } from '.';
import { getToken } from './auth';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
});

export const addJourneymanSuccess = (journeyman) => ({
  type: ADD_JOURNEYMAN,
  payload: journeyman,
});
export const addJourneyman = (journeyman) => (dispatch) => {
  request.post('http://localhost:3001/v1/journeymen', journeyman).then((response) => {
    dispatch(addJourneymanSuccess(response.data.attributes));
  });
};

export const displayJourneymen = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/v1/journeymen', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  if (response.ok) {
    const data = await response.json();
    const journeymen = data.map((journeyman) => journeyman.attributes);
    dispatch({ type: LOAD_JOURNEYMEN, payload: journeymen });
  } else {
    dispatch({ type: LOAD_JOURNEYMEN, payload: [] });
  }
};

export const deleteJourneyman = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/v1/journeymen/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });

  if (response.ok) dispatch({ type: DELETE_JOURNEYMAN, payload: id });
};
