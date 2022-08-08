import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import useAuth from './hooks/useAuth';
import SignUp from './components/everyuser/SignUp';
import LogIn from './components/everyuser/LogIn';
import Journeymen from './components/everyuser/Journeymen';
import Journeyman from './components/everyuser/Journeyman';
import NewJourneymanForm from './components/adminuser/AddJourneyman';
import DeleteJourneymanForm from './components/adminuser/DeleteJourneyman';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn loggedIn={loggedIn}/>} />
            <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/" />}>
            <Route path="/journeymen" element={<Journeymen />} />
            <Route path="/journeymen/:id" element={<Journeyman />} />
            <Route path="/reservations" element={<h1>Reservations Page</h1>} />
            <Route path="/add_journeyman" element={<NewJourneymanForm />} />
            <Route path="/delete_journeyman" element={<DeleteJourneymanForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
