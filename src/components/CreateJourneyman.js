import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJourneyman } from '../redux/actions/journeymen';

const CreateJourneyman = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser.role !== 'admin') {
    navigate('/');
  }

  const onFormSubmit = async (data) => {
    dispatch(addJourneyman(data));
    navigate('/');
  };

  return (
    <main className="">
      <div className="my-5 d-flex flex-column align-items-center">
        <h2>Add a Journeyman to Listing</h2>
        <form className="my-5 d-flex flex-row justify-content-center border border-dark" onSubmit={handleSubmit(onFormSubmit)}>
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
                {...register('name', { required: 'Journeyman name is required' })}
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
                {...register('skill', { required: 'Skill is required' })}
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
                {...register('country', { required: 'Country is required' })}
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
                {...register('city', { required: 'City is required' })}
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
                type="text"
                {...register('price', { required: 'Price is required' })}
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
                id="journeyman-image"
                type="file"
                {...register('image', { required: 'Image is required' })}
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
