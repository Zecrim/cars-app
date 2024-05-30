import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is where you will be able to see all of YOUR garages
      </p>
    </main>
  );
};

export default Dashboard;
