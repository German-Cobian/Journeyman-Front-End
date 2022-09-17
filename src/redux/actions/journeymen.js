import { ADD_JOURNEYMAN, LOAD_JOURNEYMEN, GET_JOURNEYMAN, DELETE_JOURNEYMAN } from '.';
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
        image: data.image_url,
      },
    });
  }
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
