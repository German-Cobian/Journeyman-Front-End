import axios from 'axios';
import { GET_JOURNEYMAN } from '.';
import { getToken } from './auth';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});

const displayJourneymanSuccess = (journeyman) => ({
  type: GET_JOURNEYMAN,
  payload: journeyman,
});
// eslint-disable-next-line import/prefer-default-export
export const displayJourneyman = (id) => (dispatch) => {
  request.get(`http://localhost:3001/v1/journeymen/${id}`).then((response) => {
    const journeyman = {
      id: response.data.id,
      name: response.data.name,
      skill: response.data.skill,
      country: response.data.country,
      city: response.data.city,
      price: `${response.data.price}`,
      image: response.data.image_url,
    };
    dispatch(displayJourneymanSuccess(journeyman));
  });
};
