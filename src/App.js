import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import Signup from './components/Signup';
import Login from './components/Login';
import TestPage from './components/TestPage';
import Journeymen from './components/Journeymen';
import Journeyman from './components/Journeyman';
import CreateJourneyman from './components/CreateJourneyman';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
          <Route path="/journeymen" element={<Journeymen />} />
          <Route path="/journeymen/:id" element={<Journeyman />} />
          <Route path="/" element={<CreateJourneyman />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
