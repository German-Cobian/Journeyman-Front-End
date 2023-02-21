/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/actions/auth';
import Logo from '../assets/journeymanLogo.gif';
import Services from '../assets/journeyman-services.jpeg'
import './logInOut.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (data) => {
    console.log(data);
    dispatch(signupUser(data)).catch(() => setError('Invalid credentials. Try again'));
    navigate('/');
  };

  return (
    <main className="">
      <div className="my-5 mx-5 border border-dark rounded">
        <div div className="d-flex flex-row my-3 mx-3">
          <img className="mx-5" src={Logo} width="100" height="100" alt="Journeyman logo"  />
          <h2 className="my-3 mx-3">Journeyman</h2>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <div className="my-5 mx-5 border border-dark rounded">
            <div className="">
              <h2 className="my-3 mx-5">Sign Up</h2>
            </div>
            {error && <p className="">{error}</p>}
            {errors.username && <p className="">Username is required</p>}
            {errors.email && <p className="">Email is required</p>}
            {errors.password && <p className="">Password is required</p>}
            <form className="mx-5" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-3">
                <input
                  className=""
                  type="text"
                  placeholder="Username"
                  {...register('username', { required: 'Username is required' })}
                />
              </div>
              <div className="mb-3">
                <input
                  className=""
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                />
              </div>
              <div className="mb-3">
                <input
                  className=""
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
              </div>
              <input className="my-3" type="submit" value="Sign Up" />
              <Link className="my-3 mx-4" to="/login">Log In</Link>
            </form>
          </div>
          <div className="my-5 mx-5">
            <img className="journeymen" src={Services} alt="journeyman-services" />
            <h4 className="motto my-3">Your Source for Skilled Help</h4>
        	</div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
