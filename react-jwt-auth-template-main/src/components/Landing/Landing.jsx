import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
      <h1>Hello, what should we put on this page.</h1>
      <h3>
        <ul>
          <li>stuff for a homepage<br/></li>
          <li>Check out these cool <Link to="/garages">Garages</Link></li>
        </ul>
      </h3>
    </main>
  );
};

export default Landing;
