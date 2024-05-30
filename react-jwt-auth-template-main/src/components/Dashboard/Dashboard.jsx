import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import GarageList from '../GarageList/GarageList'

const Dashboard = (props) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        <GarageList garages={props.garages} userId={user._id} />
      </p>
    </main>
  );
};

export default Dashboard;
