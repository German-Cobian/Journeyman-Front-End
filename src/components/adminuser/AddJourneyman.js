import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addJourneyman } from '../../redux/actions/journeymen';

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
      <form className="" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="">
          <div className="">
            <label
              className=""
              htmlFor="journeyman-name"
            >
              Journeyman Name
            </label>
            <input
              className=""
              id="journeyman-name"
              type="text"
              placeholder="Journeyman Name"
              {...register('name', { required: 'Journeyman name is required' })}
            />
          </div>
          <div className="">
            <label
              className=""
              htmlFor="journeyman-skill"
            >
              Skill
            </label>
            <input
              className=""
              id="journeyman-skill"
              type="text"
              placeholder="Skill"
              {...register('skill', { required: 'Skill is required' })}
            />
          </div>
          <div className="">
            <label
              className=""
              htmlFor="journeyman-country"
            >
              Country
            </label>
            <input
              className=""
              id="journeyman-country"
              type="text"
              placeholder="Country"
              {...register('country', { required: 'Country is required' })}
            />
          </div>
          <div className="">
            <label
              className=""
              htmlFor="journeyman-city"
            >
              City
            </label>
            <input
              className=""
              id="journeyman-city"
              type="text"
              placeholder="City"
              {...register('city', { required: 'City is required' })}
            />
          </div>
          <div className="">
            <label
              className=""
              htmlFor="journeyman-price"
            >
              Price
            </label>
            <input
              className=""
              id="journeyman-price"
              type="text"
              placeholder="Price"
              {...register('price', { required: 'Price is required' })}
            />
          </div>
          <div className="">
            <label
              className=""
              htmlFor="journeyman-image"
            >
              Image
            </label>
            <input
              className=""
              id="journeyman-image"
              type="file"
              placeholder="Image"
              {...register('image', { required: 'Image is required' })}
            />
          </div>
          <div className="">
            <button type="submit" className="">
              Add Journeyman
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default NewJourneymanForm;
