import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import GarageList from '../GarageList/GarageList'

const Dashboard = (props) => {
  const user = useContext(AuthedUserContext);

  const newButtonClick = () => {
    props.toggleNewGarage()
  }
  
  return (
    <main className="dashboard">
      <h1>Welcome, {user.username}</h1><br/>
      <h3>This is where you can see everybody's garages!</h3><br/>
      <div>
        <GarageList garages={props.garages} userId={user._id} />
      </div>
      <button onClick={newButtonClick}>Add a Garage</button>
    </main>
  );
};

export default Dashboard;
