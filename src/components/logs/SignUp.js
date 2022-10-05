import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../redux/actions/auth';
import Services from '../../assets/journeyman-services.jpeg';
import '../stylesheets/authentication.css';

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
    <main>
      <div className="d-flex flex-row justify-content-start mx-5">
        <div className="border border-dark rounded my-5">
          <div className="my-5 mx-5">
            <h1 className="">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)}>
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
            <div className="d-flex flex-column my-5">
              <input className="btn btn-primary py-2 px-5 mx-5" type="submit" value="Sign Up" />
              <Link className="my-4 mx-5" to="/login">Log In</Link>
            </div>
          </form>
        </div>
        <div className="my-5 mx-5">
          <img className="ad-img" src={Services} alt="journeyman-services" />
          <h2 className="motto my-5">Your Source for Skilled Help</h2>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
