import { FETCH_JOURNEYMEN } from '.';
import { getToken } from './auth';

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
    dispatch({ type: FETCH_JOURNEYMEN, payload: journeymen });
    } else {
  dispatch({ type: FETCH_JOURNEYMEN, payload: [] });
  }
};