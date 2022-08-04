import { ADD_JOURNEYMAN } from '.';
import { getToken } from './auth';

export const addJourneyman = (journeyman) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/v1/journeymen', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
    body: JSON.stringify(journeyman),
  });

  if (response.ok) {
    const { data } = await response.json();
    dispatch({
      type: ADD_JOURNEYMAN,
      payload: {
        id: data.id,
        name: data.name,
	      skill: data.skill,
        country: data.country,
        city: data.city,
        price: data.price,
        image: data.image,
      },
    });
  }
};
