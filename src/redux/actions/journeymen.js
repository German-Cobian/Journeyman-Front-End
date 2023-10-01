import axios from 'axios';
import { CREATE_JOURNEYMAN, FETCH_JOURNEYMEN, DELETE_JOURNEYMAN } from '.';
import { getToken } from './auth';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
});

const request2 = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: getToken(),
  },
});

export const addJourneymanSuccess = (journeyman) => ({
  type: CREATE_JOURNEYMAN,
  payload: journeyman,
});
export const addJourneyman = (journeyman) => (dispatch) => {
  request2.post('http://localhost:3001/v1/journeymen', journeyman).then((response) => {
    dispatch(addJourneymanSuccess(response.data.attributes));
  });
};

const displayJourneymenSuccess= (journeymen) => ({
  type: FETCH_JOURNEYMEN,
  payload: journeymen,
});
export const displayJourneymen = () => (dispatch) => {
  request.get('http://localhost:3001/v1/journeymen').then((response) => {
    const journeymen = response.data.map((journeyman) => journeyman.attributes);
    dispatch(displayJourneymenSuccess(journeymen));
  });
};

const deleteJourneymanSuccess = (journeymen) => ({
  type: DELETE_JOURNEYMAN,
  payload: journeymen,
});
export const deleteJourneyman = (id) => (dispatch) => {
  request.delete(`http://localhost:3001/v1/journeymen/${id}`).then((response) => {
    const journeymen = response.data.journeymen.map((journeyman) => journeyman.attributes);
    dispatch(deleteJourneymanSuccess(journeymen));
  });
};
