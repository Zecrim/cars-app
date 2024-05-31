import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import GarageList from '../GarageList/GarageList'

const Dashboard = (props) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <div>
        <GarageList garages={props.garages} userId={user._id} />
      </div>
    </main>
  );
};

export default Dashboard;
