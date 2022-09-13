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

const displayJourneymenSuccess = (journeymen) => ({
  type: LOAD_JOURNEYMEN,
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
    console.log(response);
    const journeymen = response.data.journeymen.map((journeyman) => journeyman.attributes);
    dispatch(deleteJourneymanSuccess(journeymen));
  });
};
