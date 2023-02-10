import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { displayJourneymen } from '../redux/actions/journeymen';

const Journeymen = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(displayJourneymen());
  }, [dispatch]);

  const journeymen = useSelector((state) => state.journeymen);

  return (
    <div className="">
      <h2>Creations</h2>
      {journeymen.map((journeyman) => (
      <div key={journeyman.id + 1}>
        <img className="" src={journeyman.image_url} alt="journeyman-img" style={{ height: '50' }} />
        <p className="">{journeyman.image_url}</p>
        <p>{journeyman.name}</p>
        <p>{journeyman.skill}</p>
        <p>{journeyman.country}</p>
        <p>{journeyman.city}</p>
        <p>{journeyman.dimensions}</p>
        <p>{journeyman.price}</p>
      </div>
      ))};
    </div>
  )
};

export default Journeymen;
