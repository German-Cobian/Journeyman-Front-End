import React, { useId } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();
  
  const navLinks = [
    {
      id: useId(),
      path: '/journeymen',
      name: 'Journeymen',
    },
    {
      id: useId(),
      path: '/reserve',
      name: 'Reserve',
    },
    {
      id: useId(),
      path: '/reservations',
      name: 'My reservations',
    },
    {
      id: useId(),
      path: '/add_journeyman',
      name: 'Add journeyman',
    },
    {
      id: useId(),
      path: '/delete_journeyman',
      name: 'Delete journeyman',
    },

  ];

  const handleLogout = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('token');
      console.log(navigate('/login'));
    }
  };

  return (
    <aside className="">
      <nav className="">
        <ul>
          {navLinks.map(({ id, path, name }) => (
            <li key={id}>
              <NavLink to={path}>{name}</NavLink>
            </li>
          ))}
          <li>
            <button type="button" onClick={(e) => handleLogout(e)}>LOG OUT</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
