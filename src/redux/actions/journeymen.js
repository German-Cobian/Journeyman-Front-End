import { ADD_JOURNEYMAN, LOAD_JOURNEYMEN } from '.';
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

export const displayJourneymen = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/v1/journeymen', {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
  });
  const { data } = await response.json();
  console.log(response)
  const journeymen = data.map((ele) => ({
    id: ele.id,
    name: ele.name,
    skill: ele.skill,
    country: ele.country,
    city: ele.city,
    price: ele.price,
    image: ele.image,
  }));

  dispatch({ type: LOAD_JOURNEYMEN, payload: journeymen });
};
