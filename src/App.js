import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import { Spinner } from 'react-bootstrap';
const WithSidebar = React.lazy(() => import( './components/WithSidebar'));
const WithoutSidebar = React.lazy(() => import('./components/WithoutSidebar'));
const Signup = React.lazy(() => import('./components/Signup'));
const Login = React.lazy(() => import('./components/Login'));
const Journeymen = React.lazy(() => import('./components/Journeymen'));
const Journeyman = React.lazy(() => import( './components/Journeyman'));
const CreateJourneyman = React.lazy(() => import( './components/CreateJourneyman'));
const DeleteJourneyman = React.lazy(() => import( './components/DeleteJourneyman'));
const CreateReservation = React.lazy(() => import( './components/CreateReservation'));
const Reservations = React.lazy(() => import('./components/Reservations'));

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
    </React.Suspense>
  );
};

export default App;
