import { GET_JOURNEYMAN } from '.';
import { getToken } from './auth';


export const displayJourneyman = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/v1/journeymen/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  const data = await response.json();
  const journeyman = {
    id: data.id,
    name: data.name,
    skill: data.skill,
    country: data.country,
    city: data.city,
    price: `${data.price}`,
    image: data.image_url,
  };
  dispatch({ type: GET_JOURNEYMAN, payload: journeyman });
};
