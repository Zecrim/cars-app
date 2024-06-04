import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = (props) => {
  const user = useContext(AuthedUserContext);

  const newButtonClick = () => {
    props.toggleNewGarage()
  }

  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><button onClick={newButtonClick}>Add a Garage</button></li>
            <li><Link to={`${user._id}`}>Profile</Link></li>
            <li><Link to="" onClick={props.handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
