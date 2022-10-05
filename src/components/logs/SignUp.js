import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../redux/actions/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onFormSubmit = (data) => {
    console.log(data);
    dispatch(signupUser(data));
    navigate('/');
  };

  return (
    <main className="d-flex flex-row justify-content-center align-items-center">
      <div className="border border-dark my-5">
        <div className="my-5 mx-5">
          <h1 className="">Sign Up</h1>
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
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
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
          <div className="my-5">
            <input className="mx-5" type="submit" value="Sign Up" />
            <Link className="" to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
