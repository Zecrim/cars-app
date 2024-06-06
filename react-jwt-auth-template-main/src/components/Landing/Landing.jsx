import { useEffect } from 'react';
import LandingPhoto from '../../assets/LandingPhoto.png'; 


const Landing = () => {
  
  useEffect(() => {
    const applyBackground = () => {
      document.documentElement.style.setProperty(
        '--background-image',
        `url(${LandingPhoto})`
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
    <main className='landing'>
      <div className="background-overlay"></div>
      <h1>The Wrench Collective</h1>
      <h3>
        Welcome to The Wrench Collective, a community of car enthusiasts to store, collect, and chat about their cars.
      </h3>
    </main>
  );
};

export default Landing;
