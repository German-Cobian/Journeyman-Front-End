import { RiFacebookCircleLine } from 'react-icons/ri';
import { AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';


const Social = () => (
  <div className="">
    <ul className="d-flex flex-row justify-content-center">
      <li className="mx-2">
        {' '}
        <AiFillGoogleCircle className="cursor-pointer h-14 w-10 " />
      </li>
      <li className="mx-2"><AiFillTwitterCircle /></li>
      <li className="mx-2"><RiFacebookCircleLine /></li>
    </ul>

  </div>
);

export default Social;
