import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJourneyman } from '../../redux/actions/journeymen';
import '../stylesheets/admin.css';

const NewJourneymanForm = () => {
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
      <div className="my-5 mx-5">
        <form className="border border-dark rounded my-5 mx-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="">
            <div className="form-group my-3 mx-5 pt-3">
              <h5 className="">Journeyman Name</h5>
              <input
                className="form-control"
                id="journeyman-name"
                type="text"
            
                {...register('name', { required: 'Journeyman name is required' })}
              />
            </div>
            <div className="form-group my-3 mx-5">
              <h5 className="">Journeyman Skill</h5>
              <select
                className="form-control"
                id="journeyman-skill"
                type="text"
                {...register('skill', { required: 'Skill is required' })}
              >
                <option selected="true" disabled="disabled" />
                <option>Mason</option>
                <option>Carpenter</option>
                <option>Plumber</option>
                <option>Electrician</option>
                <option>Painter</option>
                <option>Gardener</option>
              </select>
            </div>
            <div className="form-group my-3 mx-5">
              <h5 className="">Country</h5>
              <input
                className="form-control"
                id="journeyman-country"
                type="text"
                {...register('country', { required: 'Country is required' })}
              />
            </div>
            <div className="form-group my-3 mx-5">
              <h5 className="">City</h5>
              <input
                className="form-control"
                id="journeyman-city"
                type="text"
                {...register('city', { required: 'City is required' })}
              />
            </div>
            <div className="form-group my-3 mx-5">
              <h5 className="">Price per Day</h5>
              <input
                className="form-control"
                id="journeyman-price"
                type="text"
                {...register('price', { required: 'Price is required' })}
              />
            </div>
            <div className="form-group my-3 mx-5">
              <h5 className="">Journeyman Photo</h5>
              <input
                className="form-control"
                id="journeyman-image"
                type="file"
                {...register('image', { required: 'Image is required' })}
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
