import { AuthedUserContext } from '../../App';
import { useContext, useEffect } from 'react';
import GarageList from '../GarageList/GarageList'

const Dashboard = (props) => {
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const applyBackground = () => {
      document.documentElement.style.setProperty(
        '--background-image',
        'url("https://wallpapercave.com/wp/wp4334105.jpg")'
      );
      document.documentElement.style.setProperty(
        '--background-color',
        'transparent'
      );
    };
  
    applyBackground();
  
    return () => {
      document.documentElement.style.setProperty('--background-image', 'none');
      document.documentElement.style.setProperty('--background-color', '#242424');
    };
  }, []);
  
  return (
    <main className="dashboard">
    <div className="background-overlay"></div>
      <h1>Welcome, {user.username}</h1><br/>
      <h3>Here are all the Wrench Collective garages - look around!</h3><br/>
      <div>
        <GarageList garages={props.garages} userId={user._id} />
      </div>
      
    </main>
  );
};

export default Dashboard;
