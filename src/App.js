import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ProtectedRoutes from './ProtectedRoutes';
import useAuth from './hooks/useAuth';

import LogIn from './components/logs/LogIn';
import SignUp from './components/logs/SignUp';
import WithSidebar from './components/elements/WithSidebar';
import WithoutSidebar from './components/elements/WithoutSidebar';
import Journeymen from './components/everyuser/Journeymen';
import Journeyman from './components/everyuser/Journeyman';
import ReservationForm from './components/everyuser/AddReservation';
import Reservations from './components/everyuser/Reservations';
import NewJourneymanForm from './components/adminuser/AddJourneyman';
import DeleteJourneymanForm from './components/adminuser/DeleteJourneyman';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <React.Suspense
      fallback={(
        <Spinner
          animation="grow"
          variant="primary"
          style={{
            width: '4rem',
            height: '4rem',
            position: 'absolute',
            top: '0',
            bottom: '0',
            right: '0',
            left: '0',
            margin: 'auto auto',
          }}
        />
      )}
    >

      <Router>
        <Routes>
          <Route element={<WithoutSidebar />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn loggedIn={loggedIn} />} />
          </Route>
          <Route element={<WithSidebar />}>
            <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
              <Route path="/" element={<Journeymen />} />
              <Route path="/journeymen/:id" element={<Journeyman />} />
              <Route path="/reserve/:id" element={<ReservationForm />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/add_journeyman" element={<NewJourneymanForm />} />
              <Route path="/delete_journeyman" element={<DeleteJourneymanForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
