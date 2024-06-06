import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Garage from './components/Garage/Garage';
import NewGarageForm from './components/NewGarageForm/NewGarageForm';
import CarShow from './components/CarShow/CarShow';
import Profile from './components/Profile/Profile';
import * as authService from '../src/services/authService';
import * as garageService from './services/garageService'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [garages, setGarages] = useState([])
  const [newGarage, setNewGarage] = useState(false);

  useEffect(() => {
    const fetchGarages = async () => {
      const garageData = await garageService.index(user._id)
      setGarages(garageData)
    };
    if (user) fetchGarages();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const toggleNewGarage = () => {
    newGarage? setNewGarage(false) : setNewGarage(true)
  }

  const handleNewGarage = async (formData) => {
    const newGarage = await garageService.create(user._id, formData);
    setGarages([... garages, newGarage]);
    toggleNewGarage();
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar 
          user={user} 
          handleSignout={handleSignout}  
        />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<Dashboard user={user} garages={garages} toggleNewGarage={toggleNewGarage} />} />
            <Route path="/:userId" element={<Profile user={user} garages={garages} toggleNewGarage={toggleNewGarage} />} />
            <Route path='/:userId/garages/:garageId' element={<Garage garages={garages} setGarages={setGarages} toggleNewGarage={toggleNewGarage} />} />
            <Route path='/:userId/garages/:garageId/:carId' element={<CarShow  />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
        {newGarage && <NewGarageForm handleNewGarage={handleNewGarage}/>}
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
