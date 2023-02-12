import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';
import axios from 'axios';

const CreateJourneyman = () => {
  const { reset } = useForm();
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
    const img = document.getElementById('image_url');

    data.append('image', img.files[0]);
    // data.append('journeyman_id', parseInt(id, 10));
    data.append('name', journeyman.name);
    data.append('skill', journeyman.skill);
    data.append('country', journeyman.country);
    data.append('city', journeyman.city);
    data.append('price', journeyman.price);
    console.log(data);
    console.log(data.get('image_url'));

    axios.post('http://localhost:3001/v1/journeymen', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getToken(),
      },
    })
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  return (
    <main className="">
      <div className="my-5 d-flex flex-column align-items-center">
        <h2>Add a Journeyman to Listing</h2>
        <form className="my-5 d-flex flex-row justify-content-center border border-dark" onSubmit={handleSubmit}>
          <div className="my-5 mx-5">
            <div className="d-flex flex-row justify-content-between my-3">
              <label
                className=""
                htmlFor="journeyman-name"
              >
                Journeyman Name:
              </label>
              <input
                className=""
                id="journeyman-name"
                type="text"
                name="name"
                placeholder="Journeyman name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
              <label
                className=""
                htmlFor="journeyman-skill"
              >
                Skill:
              </label>
              <input
                className=""
                id="journeyman-skill"
                type="text"
                name="skill"
                placeholder="Journeyman skill"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
              <label
                className=""
                htmlFor="journeyman-country"
              >
                Country:
              </label>
              <input
                className=""
                id="journeyman-country"
                type="text"
                name="country"
                placeholder="Country where labor is required"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
              <label
                className=""
                htmlFor="journeyman-city"
              >
                City:
              </label>
              <input
                className=""
                id="journeyman-city"
                type="text"
                name="city"
                placeholder="City where labor is required"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-row justify-content-between my-3">
              <label
                className=""
                htmlFor="journeyman-price"
              >
                Price:
              </label>
              <input
                className=""
                id="journeyman-price"
                type="number"
                name="price"
                placeholder="Enter price per day"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column justify-content-between">
              <label
                className="my-3"
                htmlFor="journeyman-image"
              >
                Image:
              </label>
              <input
                className="btn btn-dark"
                id="image_url"
                type="file"
                name="image_url"
                placeholder="Select Image"
                required
              />
            </div>
            <div className="my-3">
              <button className="btn btn-primary btn-lg" type="submit" >
                Add Journeyman
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateJourneyman;
