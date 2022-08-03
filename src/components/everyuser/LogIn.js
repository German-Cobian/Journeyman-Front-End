/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/auth';

const LogIn = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => dispatch(loginUser(data)).catch(() => setError('Invalid credentials. Try again'));

  return (
    <main className="">
      <div className="" />
      <div className="">
        {error && <p className="">{error}</p>}
        {errors.username && <p className="">Username is required</p>}
        {errors.email && <p className="">Email is required</p>}
        {errors.password && <p className="">Password is required</p>}
        <div className="">
          <div className="">
            <h1 className="">Log in</h1>
          </div>
          <form className="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="">
              <input
                className=""
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
              <span>Username</span>
            </div>
            <div className="">
              <input
                className=""
                type="email"
                placeholder="E-mail"
                {...register('email', { required: 'E-mail is required' })}
              />
              <span>E-mail</span>
            </div>
            <div className="">
              <input
                className=""
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              <span>Password</span>
            </div>
            <div className="">
              <input type="submit" value="Submit" />
              <Link className="login" to="/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

LogIn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default LogIn;