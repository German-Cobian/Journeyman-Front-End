/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/auth';

const Login = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (data) => dispatch(loginUser(data)).catch(() => setError('Invalid credentials. Try again'));

  return (
    <main className="">
      <div className="d-flex flex-row justify-content-center">
        <div className="my-5 mx-5 border border-dark rounded">
          <div className="">
            <h2 className="my-5 mx-5">LOG IN</h2>
          </div>
          {error && <p className="">{error}</p>}
          {errors.username && <p className="">Username is required</p>}
          {errors.email && <p className="">Email is required</p>}
          {errors.password && <p className="">Password is required</p>}
          <form className="mx-5" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="mb-3">
              <input
                className=""
                type="username"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
            </div>
            <div className="mb-3">
              <input
                className=""
                type="email"
                placeholder="e-mail address"
                {...register('email', { required: 'email is required' })}
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
            <input className="my-5" type="submit" value="Log In" />
            <Link className="my-5 mx-5" to="/signup">Sign Up</Link>
          </form>
        </div>
      </div>
    </main>
  );
};

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
