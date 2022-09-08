import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJourneyman } from '../../redux/actions/journeymen';
import '../stylesheets/admin.css';

const NewJourneymanForm = () => {
  const { reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [journeyman, setJourneyman] = useState({});

  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser.role !== 'admin') {
    navigate('/');
  }

  const handleChange = (e) => {
    e.preventDefault();
    setJourneyman({ ...journeyman, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const img = document.getElementById('image');
    data.append('image', img.files[0]);
    // data.append('journeyman_id', parseInt(id, 10));
    data.append('name', journeyman.name);
    data.append('skill', journeyman.skill);
    data.append('country', journeyman.country);
    data.append('city', journeyman.city);
    data.append('price', journeyman.price);
    dispatch(addJourneyman(data));
    navigate('/');
    reset();
  };

  return (
    <main className="">
      <div className="my-5 mx-5">
        <form className="border border-dark rounded my-5 mx-5" id="form-elem" onSubmit={handleSubmit}>
          <div className="">
            <div className="form-group my-3 mx-5 pt-3">
              <input
                className="form-control"
                id="journeyman-name"
                type="text"
                name="name"
                htmlFor="name"
                placeholder="Journeyman Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-3 mx-5">
              <input
                className="form-control"
                id="journeyman-skill"
                type="text"
                name="skill"
                htmlFor="skill"
                placeholder="Journeyman Skill"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-3 mx-5">
              <input
                className="form-control"
                id="journeyman-country"
                type="text"
                name="country"
                htmlFor="country"
                placeholder="Country"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-3 mx-5">
              <input
                className="form-control"
                id="journeyman-city"
                type="text"
                name="city"
                htmlFor="city"
                placeholder="City"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-3 mx-5">
              <input
                className="form-control"
                id="journeyman-price"
                type="text"
                name="price"
                htmlFor="price"
                placeholder="Price per Day"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-3 mx-5">
              <input
                className="form-control"
                id="image"
                type="file"
                name="image"
                placeholder="Select Journeyman Photo"
                required
              />
            </div>
            <div className="form-group my-5 mx-5">
              <button type="submit" className="btn btn-primary py-2 px-5">
                Add Journeyman
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewJourneymanForm;
