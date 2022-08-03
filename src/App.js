import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/actions/auth';
import ProtectedRoutes from './ProtectedRoutes';
import useAuth from './hooks/useAuth';
import SignUp from './components/everyuser/SignUp';
import LogIn from './components/everyuser/LogIn';

function App() {
  const { authChecked, loggedIn } = useAuth();
  const dispatch = useDispatch();

  // TODO: I'm keeping this for testing. Delete once the login is implemented
  const handleClick = () => {
    dispatch(loginUser({ username: 'RegUser', email: 'reg@gmail.com', password: "123reg" }));
  };

  return (
    <Router>
      <div>
        { loggedIn ? 'Logged In' : <button type="button" onClick={handleClick}>Log In</button> }
      </div>
      <Routes>
      <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn loggedIn={loggedIn}/>} />
          <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/" />}>
          <Route path="/" element={<h1>Journeyman Page</h1>} />
          <Route path="/reservations" element={<h1>Reservations Page</h1>} />
          <Route path="/add_jorneyman" element={<h1>AddJourneyman Page</h1>} />
          <Route path="/delete_journeyman" element={<h1>DeleteJourneyman Page</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
