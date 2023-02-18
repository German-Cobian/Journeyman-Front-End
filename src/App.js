import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import WithSidebar from './components/WithSidebar';
import WithoutSidebar from './components/WithoutSidebar';
import Signup from './components/Signup';
import Login from './components/Login';
import TestPage from './components/TestPage';
import Journeymen from './components/Journeymen';
import Journeyman from './components/Journeyman';
import CreateJourneyman from './components/CreateJourneyman';
import DeleteJourneyman from './components/DeleteJourneyman';
import CreateReservation from './components/CreateReservation';
import Reservations from './components/Reservations';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route element={<WithoutSidebar />}>
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<WithSidebar />}>
          <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
            <Route path="/" element={<Journeymen />} />
            <Route path="/journeymen/:id" element={<Journeyman />} />
            <Route path="/create-journeyman" element={<CreateJourneyman />} />
            <Route path="/delete-journeyman" element={<DeleteJourneyman />} />
            <Route path="/create-reservation/:id" element={<CreateReservation />} />
            <Route path="/reservations" element={<Reservations />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
