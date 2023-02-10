/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/actions/auth';

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
      <div className="">
        <div className="">
          <div className="">
            <h2 className="">Sign Up</h2>
          </div>
          {error && <p className="">{error}</p>}
          {errors.username && <p className="">Username is required</p>}
          {errors.email && <p className="">Email is required</p>}
          {errors.password && <p className="">Password is required</p>}
          <form className="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="">
              <input
                className=""
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
            </div>
            <div className="">
              <input
                className=""
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            <div className="">
              <input
                className=""
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            <input
              className=""
              type="submit"
              value="Sign Up"
            />
            <Link className="" to="/login">Log In</Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
