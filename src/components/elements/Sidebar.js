import React, { useId, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../assets/journeyman-2.gif';
import HamburgerMenu from '../../assets/menu.svg';
import CloseMenu from '../../assets/close.svg';
import '../stylesheets/sidebar.css';

function Sidebar({ currentUser }) {
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
      name: 'My reservations',
    },
  ];

  const adminLinks = [{
    id: useId(),
    path: '/add_journeyman',
    name: 'Add Journeyman',
  },
  {
    id: useId(),
    path: '/delete_journeyman',
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

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('token');
      navigate('/login');
      navigate(0);
    }
  };

  return (
    <>
      <div className="hamburgerMenu border border-dark">
        <button className="hamburgerButton" onClick={(e) => openMenu(e)} type="button" id="menu-options">
          <img className="hamburgerImage" src={isOpen ? CloseMenu : HamburgerMenu} alt="hamburger-menu" />
        </button>
      </div>
      <aside className={isOpen ? 'open sidebar' : 'sidebar'}>
        <nav className="nav d-flex flex-column">
          <div className="">
            <img src={Logo} alt="Journeyman logo" className="logo mx-5 " />
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
            <li>
              <button className="logoutButton" type="button" onClick={() => handleLogout()}>LOG OUT</button>
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
