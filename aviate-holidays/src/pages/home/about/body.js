import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserGraph from './UserGraph';
import './body.css';

const About = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='Graph'>
      <h1 className="center">Graph</h1>
      
      <div className="button-row">
                <button onClick={() => handleNavigate('/authDemo')}>Auth Demo</button>
      <button onClick={() => handleNavigate('/about')}>About</button>

                <button onClick={() => handleNavigate('/googlelogin')}>Google Login</button>
                <button onClick={() => handleNavigate('/otherpaage')}>otherpaage</button>
                <button onClick={() => handleNavigate('/BookingsPage')}>BookingsPage</button>
      </div>
      <UserGraph />
    </div>
  );
};

export default About;
