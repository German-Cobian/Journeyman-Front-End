import React, { useId, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../redux/actions/auth';
import Logo from '../assets/journeymanLogo.gif';
import HamburgerMenu from '../assets/menu.svg';
import CloseMenu from '../assets/close.svg';
import './sidebar.css';

function Sidebar({ currentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      id: useId(),
      path: '/',
      name: 'Journeymen',
    },
    {
      id: useId(),
      path: '/reservations',
      name: 'Reservations',
    },
  ];

  const adminLinks = [{
    id: useId(),
    path: '/create-journeyman',
    name: 'Add Journeyman',
  },
  {
    id: useId(),
    path: '/delete-journeyman',
    name: 'Delete Journeyman',
  }];

  const isAdmin = () => {
    if (currentUser === 'admin') {
      return true;
    }
    return false;
  };

  const openMenu = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(logoutUser());
    {
      localStorage.removeItem('token');
      navigate('/login');
      navigate(0);
    }
  };

  return (
    <>
      <div className="displayHamburger border border-dark">
        <button className="hamburgerButton" onClick={(e) => openMenu(e)} type="button" id="menu-options">
          <img className="hamburgerImage" src={isOpen ? CloseMenu : HamburgerMenu} alt="hamburger-menu" />
        </button>
      </div>
      <aside className={isOpen ? 'open sidebar' : 'sidebar'}>
        <nav className="nav d-flex flex-column my-5">
          <div className="">
            <img className="logo mx-5" src={Logo} alt="Journeyman logo"  />
          </div>
          <ul className="my-5">
            {navLinks.map(({ id, path, name }) => (
              <li key={id}>
                <NavLink to={path} onClick={() => setIsOpen(false)}>{name}</NavLink>
              </li>
            ))}
            {isAdmin()
              ? adminLinks.map(({ id, path, name }) => (
                <li key={id}>
                  <NavLink to={path} onClick={() => setIsOpen(false)}>{name}</NavLink>
                </li>
              ))
              : null}
            <li className="my-4">
              <button
                className="btn btn-outline-light mx-3 border border-light"
                type="button" onClick={logout}>
                  <strong>Log Out</strong>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

Sidebar.defaultProps = {
  currentUser: 'user',
};

Sidebar.propTypes = {
  currentUser: PropTypes.string,
};
