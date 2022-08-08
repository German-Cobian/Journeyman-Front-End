import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { displayJourneyman } from '../../redux/actions/journeyman';

const Journeyman = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const journeyman = useSelector((state) => state.journeyman);
  useEffect(() => {
    dispatch(displayJourneyman(param.id));
  },
  [dispatch, param.id]);

  return (
    <div className="">
      <div className="">
        {Object.keys(journeyman).map((keyName, i) => (
          <table key={keyName}>

            <td>
              {keyName.charAt(0).toUpperCase() + keyName.slice(1).replaceAll('_', ' ')}
            </td>
            <td className="">
              {journeyman[keyName]}
            </td>
          </table>
        ))}
      </div>
    </div>
  );
};
export default Journeyman;
