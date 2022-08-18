/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/auth';
import Services from '../../assets/journeyman-services.jpeg';
import '../stylesheets/authentication.css';

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
      <div className="d-flex flex-row justify-content-start">
        <div className="border border-dark rounded my-5">
          {error && <p className="">{error}</p>}
          {errors.username && <p className="">Username is required</p>}
          {errors.email && <p className="">Email is required</p>}
          {errors.password && <p className="">Password is required</p>}
          <div className="">
            <div className="my-5 mx-5">
              <h1 className="">Log in</h1>
            </div>
            <form className="" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="my-2 mx-5">
                <h4>Username</h4>
                <input
                  className=""
                  type="text"
                  placeholder="Username"
                  {...register('username', { required: 'Username is required' })}
                />
              </div>
              <div className="my-2 mx-5">
                <h4>E-mail</h4>
                <input
                  className=""
                  type="email"
                  placeholder="E-mail"
                  {...register('email', { required: 'E-mail is required' })}
                />
              </div>
              <div className="my-2 mx-5">
                <h4>Password</h4>
                <input
                  className=""
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
              </div>
              <div className="d-flex flex-column my-5">
                <input className="btn btn-primary py-2 px-5 mx-5" type="submit" value="Submit" />
                <Link className="login my-4 mx-5" to="/signup">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="my-5 mx-5">
          <img className="ad-img" src={Services} alt="journeyman-services" />
          <h2 className="motto my-5">Your Source for Skilled Help</h2>
        </div>
      </div>
    </main>
  );
};

LogIn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default LogIn;
