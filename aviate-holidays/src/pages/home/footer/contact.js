import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './contact.css'; // Import your CSS file for styling

import ContactForm from './contactform';

const Contact = () => {
  return (
    <div className='contactBody'>
      <div className='show-all'>
      <Link to="/comments">
        <button className="show-all-button">Show All Submissions</button>
      </Link>
      </div>
      <div>
        {/* Your ContactForm component */}
        <ContactForm />
      </div>
      {/* <Link to="/another-page">
        <button style={{ position: 'fixed', bottom: '10px', left: '10px' }}>Go to Another Page</button>
      </Link> */}
    </div>
  );
};

export default Contact;
