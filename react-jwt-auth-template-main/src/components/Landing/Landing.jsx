import { useEffect } from 'react';

const Landing = () => {
  
  useEffect(() => {
    const applyBackground = () => {
      document.documentElement.style.setProperty(
        '--background-image',
        'url("https://i.redd.it/mc1cx55wz6i71.jpg")'
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
