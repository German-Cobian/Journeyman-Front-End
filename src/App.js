import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser, checkAuth } from './redux/actions/auth';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleClick = () => {
    dispatch(loginUser({ username: 'AdminUser', email: 'admin@gmail.com', password: '123admin' }));
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        { auth.loggedIn ? 'logged in' : 'not logged in'}
        <button type="button" onClick={handleClick}>get data</button>
      </div>
    </Router>
  );
};

export default App;
