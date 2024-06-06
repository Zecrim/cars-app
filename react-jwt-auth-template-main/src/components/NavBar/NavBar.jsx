import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import carLogo from '../../assets/carLogo.png'; 

const NavBar = (props) => {
  const user = useContext(AuthedUserContext);

  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li><Link to="/">
              <img src={carLogo} alt='Car-Logo' height={70}/>
            </Link></li>
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
