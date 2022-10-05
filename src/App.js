import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ProtectedRoutes from './ProtectedRoutes';
import useAuth from './hooks/useAuth';

const LogIn = React.lazy(() => import('./components/logs/LogIn'));
const SignUp = React.lazy(() => import('./components/logs/SignUp'));
const WithSidebar = React.lazy(() => import('./components/elements/WithSidebar'));
const WithoutSidebar = React.lazy(() => import('./components/elements/WithoutSidebar'));
const Journeymen = React.lazy(() => import('./components/everyuser/Journeymen'));
const Journeyman = React.lazy(() => import('./components/everyuser/Journeyman'));
const ReservationForm = React.lazy(() => import('./components/everyuser/AddReservation'));
const Reservations = React.lazy(() => import('./components/everyuser/Reservations'));
const NewJourneymanForm = React.lazy(() => import('./components/adminuser/AddJourneyman'));
const DeleteJourneymanForm = React.lazy(() => import('./components/adminuser/DeleteJourneyman'));

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
