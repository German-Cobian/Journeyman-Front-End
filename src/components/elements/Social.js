import { RiFacebookCircleLine } from 'react-icons/ri';
import { AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';
import '../stylesheets/social.css';

const Social = () => (
  <div className="">
    <ul className="d-flex flex-row justify-content-center">
      <li className="li-items mx-2">
        {' '}
        <AiFillGoogleCircle className="icons" />
      </li>
      <li className="li-items mx-2"><AiFillTwitterCircle className="icons" /></li>
      <li className="li-items mx-2"><RiFacebookCircleLine className="icons" /></li>
    </ul>

  </div>
);

export default Social;
